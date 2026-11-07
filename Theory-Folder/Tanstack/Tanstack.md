## TanStack-----------------------
**Sir class** ------
# Core 3 concepts of React Query:
* Queries: to get something from server.
    eg. to get products from server.
* Mutations to give something to server.
    eg.
* Query Invalidation:
    - /revalidation
    - this packages keep caches that stales data. when dev wants to replace tha caches after changes(like new data added) that change is called __invalidation/revalidation__


## QueryClientProvider
  `<QueryClientProvider client ={variable of  QueryClient()}>`
## QueryClient()

## Accessing the Query in TanStack
* - useQuery
    eg.  to get products in products' container. (class example using dummy json)
* - Tanstack to __call__ api, fetched by Axios using __useQuery__ hook

* - queryKey: queryKey is an array ???
    - object  = useQuery({qury:[name of uniquekey]})


## Try Catch -> manually not needed, as TanStack handles it.

## ispending
## isError
# loading

## React Devtools -----------

## Important Defaults @ Tanstackl website ------
# Frontend Caching: bcz React Cannot Cache
* - if the user goes to somewhere else, the caching by TanStack makes it stay there without newly fetching. 
    TansTack __refetches__ it from __cache__. ????????

* __inifinity__
*__static__
* **refetch in background**
# Retry auto 3 times----------
# StaleTime:
* - inside **useQuery**
* - or inside __main.jsx__ -> inside an **Object {}** inside **QueryClient()** -> inside **queries:{staleTime: }**

## Filter

## Category List

## Sort