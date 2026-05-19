import { useEffect, useState } from "react";

function App() {
// render and re-render jokes data in UI - useState()
  const [jokesData, setJokesData] = useState(null);
//  calling API function
  async function callApi() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
// setting the fetched and parsed data object as arguement of setJokesData() function
// as state value to render/re-render, 
    setJokesData(data); //
  }

// useEffect to handle side effect like API calling, to fire api call only once initial render
/*   - only run ONCE after first mount, never again
     - [] = "don't re-run on re-renders"
 */
useEffect(()=>{
  callApi();
}, [])
  return (
    <>
      <h1> Jokes:</h1>
      <h2> setup: {jokesData?.setup} </h2> {/* ?. (optional chaining operator) for conditional rendering */}
      <h2>punchline : {jokesData?.punchline} </h2>
    </>
  )
}

export default App
