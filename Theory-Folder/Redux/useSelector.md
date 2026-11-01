useSelector 
- gathers all the data from store (sir point)


AI Overview
Yes, useSelector extracts and reads data from the Redux store, but it does not "collect" or fetch it in an active sense (like an API call). 

Redux
 +1
How it works:
Accesses the State: It takes a selector function as an argument, passes the entire Redux store state into that function, and returns whatever slice or derived value you ask for. 

YouTube
·Thapa Technical
 +1
Subscribes to Updates: It subscribes your React component to the Redux store. Whenever an action is dispatched and the store updates, useSelector runs your selector function again and checks if the result has changed. 

Nuvolar
 +2
Triggers Re-renders: If the returned value is different (using a strict reference comparison ===), it forces your component to re-render. 