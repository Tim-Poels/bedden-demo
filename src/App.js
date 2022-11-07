import { useState } from "react"
import Header from "./components/Header.js";
import Body from "./components/Body.js";

const App = () => {
  // setState to change to another step
  const [useSteps, setSteps] = useState(1); //This was null for some reason so I changed it to 1, if something breaks it might be this
  return (
    <div className="App">
      <Header step={useSteps} />
      <Body setSteps={setSteps} useSteps={useSteps} />
    </div>
  );
}

export default App;