import { useState } from 'react'
// import Button from './components/Button' : default original name
import MyButton from './components/Button';
import ButtonWithProps from './components/ButtonWithProps';
import ButtonWithDestructuring from './components/ButtonWithDestructuring';



function App() {
  // Count with button with plain JS : JS runs fine, but it won't trigger re-render of the count
      let count = 0;
      function up(){
        count++;
        console.log(count);
        
      }
  return (
    <>
      <MyButton></MyButton>
      <MyButton />
  {/* both self closing tag and paired tags fine, but  The self-closing version is the conventional style when there's no content between the tags. */}

  {/* component using props: dynamic */}
      <ButtonWithProps buttontext={"props button"} />
      <ButtonWithProps buttontext={" WTH props "} />
      <ButtonWithProps buttontext={"Hola Amigos"} />

  {/* component using destructuring: dynamic */}
      <ButtonWithDestructuring buttontext={"LET's DESTRUCTURE"}/>
      <ButtonWithDestructuring buttontext={"Kangsangmida !!!!"}/>


      {/* --------------------------------------------
      Count with button with plain JS : JS runs fine, but it won't trigger re-renders*/}
          {/* <h1>Count {count} </h1>
        <button onClick={up}>Count Button</button> */}
    </>
  )
}

export default App
