# User

useSearchParams vs useParams

---

# Claude

Both are React Router hooks (from `react-router-dom`) for reading data from the URL, but they read different parts of it.

## `useParams`

**What it is:** A hook, i.e. a function you call inside a component. It takes no arguments and returns an **object** (type `Readonly<Params<string>>`) mapping each dynamic route segment name to its string value.

It reads **URL path parameters**, which are the dynamic segments you define in the route with a colon.

```jsx
// Route definition
<Route path="/orders/:orderId" element={<OrderDetails />} />

// OrderDetails.jsx
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams(); // URL: /orders/42  →  orderId = "42"
  return <h1>Order #{orderId}</h1>;
}
```

- **Return type:** an object whose values are `string | undefined`
- **Read-only:** to change it, you navigate to a different URL
- Values are always strings, so convert with `Number(orderId)` if needed

## `useSearchParams`

**What it is:** A hook that returns a **tuple** (an array of exactly two items), similar to `useState`:

1. `searchParams`: a [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object (a built-in browser class with methods like `.get()`, `.has()`, `.getAll()`)
2. `setSearchParams`: a function you call to update the query string, which causes a navigation and re-render

It reads the **query string**, which is the part after `?`.

```jsx
import { useSearchParams } from "react-router-dom";

function OrderList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL: /orders?status=pending&page=2
  const status = searchParams.get("status"); // "pending"  (string | null)
  const page = searchParams.get("page");     // "2"

  const changeStatus = (newStatus) => {
    setSearchParams({ status: newStatus, page: 1 });
  };

  return <button onClick={() => changeStatus("delivered")}>Show delivered</button>;
}
```

- `.get(key)` returns `string | null` (`null` if the key is missing)
- `setSearchParams` accepts an object, a string, or a `URLSearchParams`, and **replaces** the entire query string

## Side-by-side

| | `useParams` | `useSearchParams` |
|---|---|---|
| **Reads** | Path segments (`/orders/42`) | Query string (`?status=pending`) |
| **Defined in** | The `<Route path="...:id">` | Nowhere, it's free-form |
| **Returns** | An object `{ orderId: "42" }` | A tuple `[searchParams, setSearchParams]` |
| **Can you set it?** | No, you navigate instead | Yes, with `setSearchParams` |
| **Missing value** | `undefined` | `null` (via `.get()`) |
| **Typical use** | Identifying *which* resource | Filtering, sorting, pagination, search |

## Rule of thumb

- **`useParams`** answers *"which thing am I looking at?"* → `/orders/42`, `/users/sara`
- **`useSearchParams`** answers *"how should I view the list?"* → `?status=pending&sort=date&page=2`

You can use both together in one component:

```jsx
// URL: /orders/42?tab=receipt
const { orderId } = useParams();
const [searchParams] = useSearchParams();
const tab = searchParams.get("tab"); // "receipt"
```

Since you're working on order dashboards, a natural fit would be `useParams` for a single order's page (`/orders/:orderId`) and `useSearchParams` for filtering the order list by status or date.
