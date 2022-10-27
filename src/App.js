import { useState } from "react"
import Header from "./components/Header.js";
import Body from "./components/Body.js";

const App = () => {
  // setState to change to another step
  const [useSteps, setSteps] = useState(null);
  return (
    <div className="App">
      <Header step={useSteps} />
      <Body setSteps={setSteps} useSteps={useSteps} />
    </div>
  );
}

export default App;