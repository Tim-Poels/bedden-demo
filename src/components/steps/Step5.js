import priceCalculator from "./priceCalculator.js"

const Step4 = (props) => {
  let price = priceCalculator()

  let width = sessionStorage.getItem("currentWidth")
  let length = sessionStorage.getItem("currentLength")

  let mesurements = `${width} cm x ${length} cm`
  let matresMesurements = `${width - 10} cm x ${length - 10} cm`

  let fabricText = sessionStorage.getItem("texture").split("-")[0] + " fabric"

  let legModelText = "model " + sessionStorage.getItem("currentLeg").split(".")[0].split("_")[2]

  let legMaterialText = "error"
  let materialName = sessionStorage.getItem("currentLegTexture").split("Texture")[1]
  switch (parseInt(materialName, 10)) {
    case 0:
      legMaterialText = "black steel"
      break;
    case 1:
      legMaterialText = "white steel"
      break;
    case 2:
      legMaterialText = "light grey steel"
      break;
    case 3:
      legMaterialText = "dark grey steel"
      break;
    default:
      legMaterialText = "error in step5.js"
      break;
  }

  return (
    <div className="body-steps">
      <div className="step-header">
        <div className="orange-box">
          <p className="step">Step</p>
          <p className="number">5</p>
        </div>
        <p className="title">
          CHECKOUT
        </p>
      </div>
      <div className="step-container">
        <div className="checkout-tab">
        <div className="bill">
          <div className="items-display">
            <div className="flex">
              <p>Standard Fee</p>
              <p>99.99€</p>
            </div>
            <div className="section">
              <div className="flex">Frame:</div>
              <div className="sub section flex">
                <p>{mesurements}</p>
                {price.frame % 1 === 0 ?  <p>+ {price.frame}.00€</p> : <p>+ {price.frame}0€</p>}
              </div>
              <div className="sub section flex">
                <p>{fabricText}</p>
                <p>+ {price.fabric}.00€</p>
              </div>
              <div className="sub section flex">
                <p> 80 cm backboard</p>
                <p>+ 50.00€</p>
              </div>
            </div>
            <div className="section">
              <div className="flex">
                <p>Legs:</p>
              </div>
              <div className="sub section flex">
                <p>{legMaterialText}</p>
                <p>+ {price.legMaterial}.00€</p>
              </div>
              <div className="sub section flex">
                <p>{legModelText}</p>
                <p>+ {price.leg}.00€</p>
              </div>
            </div>
            <div className="section">
              <div className="flex">
                <p>Matres:</p>
              </div>
              <div className="sub section flex">
                <p>{matresMesurements}</p>
                {price.matres % 1 === 0 ?  <p>+ {price.matres}.00€</p> : <p>+ {price.matres}0€</p>}
              </div>
              <div className="sub section flex">
                <p>basic model</p>
                <p>+ 00.00€</p>
              </div>
            </div>
          </div>
          <div className="total">
            <div className="flex">
              <p>TOTAL</p>
              <p>{price.total}€</p>
            </div>
          </div>
        </div>
        </div>
        <div className="next-previous-step">
          <button className="previous-button" onClick={() => {props.setSteps(4)}}> Previous </button>
          <button className="next-button">Order</button>
        </div>
      </div>
    </div>
  )
}

export default Step4