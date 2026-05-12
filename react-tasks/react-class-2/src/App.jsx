import { useState } from 'react'
// import Button from './components/Button' : default original name
import MyButton from './components/Button';
import ButtonWithProps from './components/ButtonWithProps';



function App() {


  return (
    <>
      <MyButton></MyButton>
      <MyButton /> 
        {/* both self closing tag and paired tags fine, but  The self-closing version is the conventional style when there's no content between the tags. */}

{/* component using props: dynamic */}
     <ButtonWithProps buttontext={"props button"} />
     <ButtonWithProps buttontext={" WTH props "} />
     <ButtonWithProps buttontext={"Hola Amigos"} />
    </>
  )
}

export default App
