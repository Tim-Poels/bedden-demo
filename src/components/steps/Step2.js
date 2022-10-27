// import { scene } from "../CanvasElement.js";
import testTexture from "../../assets/pexels-engin-akyurt-1487809.jpg"

const Step2 = (props) => {
  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">step</p>
          <p className="number">2</p>
        </div>
        <p className="title">
          HEADBOARD
        </p>
      </div>
      <div className="step-container">
        <div className="selection-container">
          <p className="title">TEXTURE</p>
          <div className="checkbox-container">
            <div className="checkbox active">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
            <div className="checkbox">
              <img className="checkbox-img" src={testTexture} alt="error loading img"></img>
              <div className="checkbox-checker"></div>
            </div>
          </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(1)}}> previous </button>
          <button className="next-button" onClick={() => {props.setSteps(3)}}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

export default Step2