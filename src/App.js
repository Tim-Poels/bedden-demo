import { useState } from "react"
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";

const App = () => {
  // setState to change to another step
  const [useSteps, setSteps] = useState(1);
  return (
    <div className="App">
      <Header step={useSteps} />
      <Body setSteps={setSteps} currentStep={useSteps} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;