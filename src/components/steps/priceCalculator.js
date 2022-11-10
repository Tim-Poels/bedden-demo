const priceCalculator = () => {
  let width = parseInt(sessionStorage.getItem("currentWidth"), 10)
  let lenght = parseInt(sessionStorage.getItem("currentLength"), 10)
  let texture = sessionStorage.getItem("texture")
  let leg = sessionStorage.getItem("currentLeg")
  let legTexture = sessionStorage.getItem("currentLegTexture")

  let price = 99;

  if (width) price += width
  else price += 200

  if (lenght) price += lenght
  else price += 220

  switch (texture) {
    case "white-test":
      price += 50
      break;
    case "red-test":
      price += 70
      break;
    case "yellow-test":
      price += 60
      break;
    case "orange-test":
      price += 80
      break;
    default:
      price += 50
  }

  switch (leg) {
    case "bed-leg":
      price += 50
      break;
    case "legs/101_POOT_A.glb":
      price += 60
      break;
    case "legs/101_POOT_B_ALU.glb":
      price += 70
      break;
    case "legs/101_POOT_CDZ.glb":
      price += 60
      break;
    case "legs/101_POOT_DZ.glb":
      price += 120
      break;
    case "legs/101_POOT_EO_ZWART.glb":
      price += 100
      break;
    default:
      price += 50
  }

  switch (legTexture) {
    case "legTexture0":
      break; // price + 0
    case "legTexture1":
      price += 10
      break;
    case "legTexture2":
      price += 10
      break;
    case "legTexture3":
      price += 20
      break;
    default:
      break;
  }

  return price + " €"
}


export default priceCalculator