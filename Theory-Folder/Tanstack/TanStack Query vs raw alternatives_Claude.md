# Conversation History

---

## User

what is tanstack query? what are its traditional raw alternatives ?

---

## Claude

# What is TanStack Query?

**TanStack Query** (formerly React Query) is a library for managing **server state** in front-end apps. Server state is data that lives on your backend (like your todos or orders in MongoDB) and that your UI only borrows a copy of. It handles fetching, caching, refetching, and updating that data for you.

It works with React, and also Vue, Solid, Svelte, and Angular.

## The problem it solves

When you fetch data by hand, you have to manage a lot yourself:

- Loading and error states
- Caching, so you don't re-fetch the same data on every page visit
- Refetching when the data becomes outdated
- Avoiding duplicate requests and race conditions
- Updating the UI after you create, edit, or delete something

## The raw way (no library)

```jsx
import { useState, useEffect } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <ul>{todos.map((t) => <li key={t._id}>{t.title}</li>)}</ul>;
}
```

Terms used here:
- `useState` is a **React Hook**. It takes an initial value and returns a tuple `[state, setState]`.
- `useEffect` is a **React Hook** that runs a **side-effect function** after render. Its second argument, `[]`, is the **dependency array**; an empty one means "run once, after the first render."
- `fetch(url)` returns a `Promise<Response>`. `res.json()` returns a `Promise` that resolves to the parsed JSON body.

## The TanStack Query way

```jsx
import { useQuery } from "@tanstack/react-query";

function Todos() {
  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <ul>{data.map((t) => <li key={t._id}>{t.title}</li>)}</ul>;
}
```

Terms used here:
- `useQuery` is a **custom Hook** that takes one **options object** and returns a **query result object**.
- `queryKey` is an **array** that uniquely identifies the data in the cache. If the key changes (e.g. `["todos", userId]`), it fetches again.
- `queryFn` is a **function that returns a Promise**. It does the actual fetching.
- `data` is the resolved value of the Promise (type `unknown`/your own type), `isPending` is a `boolean`, and `error` is an `Error | null`.

For writes (POST, PUT, DELETE) you use **`useMutation`**, then call **`queryClient.invalidateQueries({ queryKey: ["todos"] })`**. This marks the cached data as stale so it refetches automatically.

You also wrap your app once in a **`<QueryClientProvider client={queryClient}>`**, a **Context Provider** component that gives every component access to the cache.

## Traditional ("raw") alternatives

| Approach | What it is | Downside |
|---|---|---|
| **`useState` + `useEffect` + `fetch`** | Manual fetching, as shown above | Lots of repeated code, no caching |
| **`axios` inside `useEffect`** | Same pattern, but with the Axios HTTP client (nicer syntax, auto JSON parsing) | Axios only replaces `fetch`; it doesn't manage state or caching |
| **Custom hook (e.g. `useFetch`)** | You wrap the pattern above in your own reusable hook | You end up rebuilding a worse TanStack Query |
| **Redux / Redux Toolkit with thunks** | Store fetched data in a global store, using `createAsyncThunk` | Heavy boilerplate for something that isn't really client state |
| **React Context + `useReducer`** | Keep fetched data in a global context | Re-renders and no built-in caching |

## Library alternatives (not raw, but comparable)

- **SWR**: a lighter library by Vercel, with a similar idea but fewer features
- **RTK Query**: built into Redux Toolkit, good if you already use Redux
- **Apollo Client**: mainly for GraphQL

## Quick takeaway for your MERN path

Use `useState` for **client state** (a form input, a modal open or closed). Use TanStack Query for **server state** (data from your Express/Mongo API). It's a great next step after your Todo API, since the front end can then consume it cleanly. Learning the raw `useEffect` + `fetch` version first, as you'd do anyway, makes it obvious what the library is saving you from.

---

## User

can axios and tanstack be used in same project like nilus kitchen?

---

## Claude

Yes, and in fact they're meant to work together. Your Nilus Kitchen stack already includes Axios, so adding TanStack Query is a natural fit.

## Why they don't conflict

They do different jobs:

- **Axios** is an **HTTP client**. It sends the request and returns a `Promise` that resolves to a response object.
- **TanStack Query** is a **server-state manager**. It doesn't send requests itself. It calls whatever function you give it and handles caching, loading and error states, and refetching.

TanStack Query's `queryFn` only needs to be a **function that returns a Promise**. Axios calls return Promises, so you just put Axios inside it.

## How they fit together

First, one shared **Axios instance** (created with `axios.create()`, which takes a config object and returns an Axios instance):

```js
// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor: attaches the JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

`api.interceptors.request.use(fn)` registers an **interceptor**, a function that receives the request `config` object and must return it (modified or not). This is where your owner-only JWT gets attached, in one place instead of in every call.

Then use it inside `useQuery` and `useMutation`:

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// READ: list orders
function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data; // Axios puts the parsed body in res.data
    },
  });
}

// WRITE: confirm an order
function useConfirmOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId) => api.patch(`/orders/${orderId}/confirm`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
```

- `res.data` is the **parsed response body**. Unlike `fetch`, Axios parses JSON for you and **rejects the Promise on 4xx/5xx status codes**, which is exactly what TanStack Query needs to detect errors.
- `mutationFn` is a function that takes the **variables** you pass to `mutate()` and returns a Promise.
- `onSuccess` is a **callback** that runs when the mutation succeeds. Invalidating `["orders"]` makes the dashboard list refetch automatically.

## Where it helps in Nilus Kitchen

- **Order dashboard**: `useQuery(["orders"])` caches the list, so switching pages doesn't re-fetch every time.
- **Owner confirms an order**: `useMutation` plus `invalidateQueries` updates the list without a manual refresh.
- **Login**: `useMutation` suits it well, since it's an action rather than data to cache.
- **PDF receipt download**: this one is better as a plain Axios call with `responseType: "blob"` inside an event handler or mutation. A download is an action, not cached data, so it doesn't belong in `useQuery`.

## Setup reminder

```jsx
// main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

`QueryClient` is a **class** whose instance holds the cache. Create it once, outside your components.

## Should you add it now?

For a small project, plain Axios with `useState` and `useEffect` works fine, and it's good for learning. TanStack Query pays off once you have several lists that need refreshing after changes, like orders, which is what your dashboard has. If your goal is a portfolio piece that shows modern practice, it's a worthwhile addition.

---

## User

**Attached file:** `excerpt_from_previous_claude_message.txt`

````text
Then use it inside useQuery and useMutation:

jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// READ: list orders
function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data; // Axios puts the parsed body in res.data
    },
  });
}

// WRITE: confirm an order
function useConfirmOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId) => api.patch(`/orders/${orderId}/confirm`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
````

in which file and folder does it belong to?

---

## Claude

It belongs in the **frontend** folder of your project, as a **custom hook** file. The import path `"../api/axios"` in the code already assumes this layout:

```
nilus-kitchen-demo-4/
├── backend/
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js          ← the shared Axios instance
        ├── hooks/
        │   └── useOrders.js      ← put this code here
        ├── pages/
        │   └── Dashboard.jsx     ← uses the hooks
        ├── App.jsx
        └── main.jsx              ← QueryClientProvider goes here
```

## Why `src/hooks/useOrders.js`

- A **custom hook** is a function whose name starts with `use` and that calls other hooks inside it. Here, `useOrders` calls `useQuery`, and `useConfirmOrder` calls `useQueryClient` and `useMutation`.
- The file goes in `hooks/` because it holds reusable data logic rather than UI.
- The extension is `.js` because the file contains no JSX. Use `.jsx` only for files that return markup.
- `../api/axios` means "go up one folder from `hooks/` into `src/`, then into `api/`". That is why the two folders sit side by side.

## You need to add `export`

The excerpt doesn't export the functions, so add `export` so other files can import them:

```js
// frontend/src/hooks/useOrders.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useOrders() {
  // ...same as before
}

export function useConfirmOrder() {
  // ...same as before
}
```

`export function name() {}` is a **named export**. The importing file must use the same name inside curly braces.

## Using them in a component

```jsx
// frontend/src/pages/Dashboard.jsx
import { useOrders, useConfirmOrder } from "../hooks/useOrders";

function Dashboard() {
  const { data: orders, isPending, error } = useOrders();
  const confirmOrder = useConfirmOrder();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <ul>
      {orders.map((order) => (
        <li key={order._id}>
          {order.customerName}
          <button onClick={() => confirmOrder.mutate(order._id)}>
            Confirm
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Dashboard;
```

- `data: orders` is **object destructuring with renaming**: it takes the `data` property and stores it in a variable called `orders`.
- `confirmOrder.mutate(order._id)` is a **function** that triggers the mutation. Its argument becomes the `orderId` parameter of `mutationFn`.

## Setup checklist

1. Run `npm install @tanstack/react-query` inside the **`frontend/`** folder, not the root and not `backend/`.
2. Wrap `<App />` in `<QueryClientProvider>` in `main.jsx`, as shown in my previous message.
3. Make sure `src/api/axios.js` exists, with the `axios.create()` instance from before.

Good checkpoint for GitHub: after this works locally, commit with something like `add TanStack Query hooks for orders`.

---

## User

Generate a markdown file of this whole conversation history keeping everything exactly the same.
