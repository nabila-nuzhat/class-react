import { useEffect, useRef, useState } from "react"
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
const [count, setCount] = useState(0);
const [count2, setCount2] = useState(0);
const [count3, setCount3] = useState(0);
// storing and showing previous state of count in UI simultaneously with the changed curret state
    const [count4, setCount4] = useState(0);
    const previousStateValueCount4 = useRef(0);
    useEffect(()=>{
      /* show previous state value in this: <h3>Previous state {} </h3>
        to store/ persist the previous state value use : useRef() in previousStateValueCount4.current
      */
      previousStateValueCount4.current = count4;
    }, [count4])


  // show alert after the page renders
  //  alert("what'sup!");

  // alert() is synchronous and blocks the browser's paint thread.
    // React's useEffect runs after it commits to the DOM, but that's not the same as the browser visually painting. On a slow initial load, the network delay gives the browser enough time to paint first. On a cached refresh, everything happens so fast that alert() fires and freezes the paint before "Hola!!" ever appears on screen.
useEffect(()=>{
  // console.log("what'sup!");
  
  alert("what'sup!");
},[])

// useEffect on count deps -------------------
//  connected to button 1 : count dependency, no connection with button 2 

useEffect(()=>{
  console.log("let's count and see the effect");
},[count])

/* useRef() -------------------------- 
  2nd useRef() is for Input Component */
const inputRef = useRef(null); 
const inputRefComponent = useRef(null); 

// handleCountEffect button 1
function handleCountEffect(){
  setCount((prev)=> {
   return prev + 1;
  });
}
// handleCountEffect button 2
function handleCountEffect2(){
  setCount2((prev)=> {
   return prev + 1;
  });
}



  return (
    <>
     <h1>Hola!!</h1>
     <h2>Count and useEffect {count} </h2>
     <button onClick={handleCountEffect}>useEffect Count</button>
{/*  no connection with useEffect() */}
     <button onClick={handleCountEffect2}> Count2 useState no connection with useEffect {count2}</button>

     {/* set Count with Button component */}
<h2>Component Button: {count} </h2>
     <Button onClickCount={handleCountEffect} text={"useEffect Count Component"} />
{/* setcount function directly written as prop inside component */}
{/* <h3> direct setcount function : {count3} </h3> */}
     <Button onClickCount = {()=> setCount3((prev)=>prev+1)} text={`Count: Component w/o effect ${count3}`} />
     {/* <Button onClickCount = {()=> setCount3((prev)=>prev+1)} text={`Count: Component w/o effect`} /> */}


{/* useRef()--------------- */}
<h2>UseRef</h2>
    <input type="email" ref={inputRef} />
    <button onClick={()=>{inputRef.current.focus()}}>Guys Focus!</button>

    {/* input component  */}
<h2>UseRef: component</h2>
    <Input inputRefComponent={inputRefComponent} />
     <Button onClickCount ={()=>{inputRefComponent.current.focus()}} text={"Hey, Focus Lady!"}/>


{/* storing and showing previous state of count in UI simultaneously with the changed curret state  */}

    <h4>Previous state {previousStateValueCount4.current} </h4>
    <h3>New state value {count4} </h3>
    <button onClick={()=>setCount4((prev)=>prev+1)} > Simultaneous both State </button>
    
    </>
  )
}

export default App
