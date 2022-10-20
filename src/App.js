import { useState } from "react"
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";

const App = () => {
  const [useSteps, setSteps] = useState(1);
  return (
    <div className="App">
      <Header step={useSteps} />
      <Body setSteps={setSteps} />
      <Footer />
    </div>
  );
}

export default App;