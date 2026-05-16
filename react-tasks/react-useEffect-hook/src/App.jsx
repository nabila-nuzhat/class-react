import { useEffect, useState } from "react"


function App() {
  // show alert after the page renders
  //  alert("what'sup!");

  // alert() is synchronous and blocks the browser's paint thread.
    // React's useEffect runs after it commits to the DOM, but that's not the same as the browser visually painting. On a slow initial load, the network delay gives the browser enough time to paint first. On a cached refresh, everything happens so fast that alert() fires and freezes the paint before "Hola!!" ever appears on screen.
useEffect(()=>{
  // console.log("what'sup!");
  
  alert("what'sup!");
},[])

// useEffect on count deps
const [count, setCount] = useState(0);
const [count2, setCount2] = useState(0);

function handleCountEffect(){
  setCount((prev)=> {
   return prev + 1;
  });
}
function handleCountEffect2(){
  setCount2((prev)=> {
   return prev + 1;
  });
}
useEffect(()=>{
  console.log("let's count and see the effect");
},[count])


  return (
    <>
     <h1>Hola!!</h1>
     <h2>Count and useEffect {count} </h2>
     <button onClick={handleCountEffect}>useEffect Count</button>
     <button onClick={handleCountEffect2}> Count2 useState no connection with useEffect {count2}</button>
    </>
  )
}

export default App
