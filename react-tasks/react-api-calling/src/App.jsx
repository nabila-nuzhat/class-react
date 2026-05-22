import { useEffect, useState } from "react";
import "./App.css"
import styles from "./App.module.css" // CSS Module
function App() {

  // render and re-render jokes data in UI - useState()
  const [jokesData, setJokesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//  calling API function  
  async function callApi() {
  // try catch to handle error- see more at theory-react
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');

  // catch Http error
      if (!response.ok) {
        throw new Error(`HTTP error! Error status: ${response.status} ${response.statusText}`);
      }
  // data json
      const data = await response.json();
      // setting the fetched and parsed data object as arguement of setJokesData() function, as state value to render/re-render, 
      setJokesData(data); //
  
    } catch (error) { // ???????????? issue: error inside catch why local var unknown, why .message isnt shown in suggestion of vscode?
      setError(error.message);
    }
    finally {
      setLoading(false); // initially true, so that loader shows if takes time to render 
    }
  };
// useEffect to handle side effect like API calling, to fire api call only once initial render
  /*   - only run ONCE after first mount, never again
       - [] = "don't re-run on re-renders"
   */
  useEffect(() => {
    callApi();
  }, [])

// loader & error o/p in UI if exists. works bcz inside function App
  if (loading) {
    return <p>Loading.... Looooading...!!</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <h1 className={styles.h1}> Jokes!</h1> {/* using Css Module to apply style. syntax: Theory */}
      {/* before conditional rendering and try catch application (with ?. (optional chaining operator))  ----------------o/p */}
      {/*<h2> setup: {jokesData?.setup} </h2> */} {/* ?. (optional chaining operator) for conditional rendering */}
      {/*  <h2>punchline : {jokesData?.punchline} </h2> */}

      {/* after conditional rendering and try catch application (without ?. (optional chaining operator)) ----------------o/p */}
      <h3> setup: {jokesData.setup} </h3>
      <h3>punchline : {jokesData.punchline} </h3>
    </>
  )
}

export default App
