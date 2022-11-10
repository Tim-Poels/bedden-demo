const priceCalculator = () => {
  let width = parseInt(sessionStorage.getItem("currentWidth"), 10)
  let lenght = parseInt(sessionStorage.getItem("currentLength"), 10)
  let texture = sessionStorage.getItem("texture")
  let leg = sessionStorage.getItem("currentLeg")
  let legTexture = sessionStorage.getItem("currentLegTexture")
  
  let bill = {}

  let price = 99.99;

  let framePrice = 0;

  if (width) framePrice += width
  else framePrice += 200

  if (lenght) framePrice += lenght
  else framePrice += 220

  bill.frame = framePrice;
  price += framePrice;

  let texturePrice;

  switch (texture) {
    case "white-test":
      texturePrice = 50
      break;
    case "red-test":
      texturePrice = 70
      break;
    case "yellow-test":
      texturePrice = 60
      break;
    case "orange-test":
      texturePrice = 80
      break;
    default:
      texturePrice = 50
  }

  bill.fabric = texturePrice
  price += texturePrice

  let legPrice;

  switch (leg) {
    case "legs/101_POOT_A.glb":
      legPrice = 60
      break;
    case "legs/101_POOT_B_ALU.glb":
      legPrice = 70
      break;
    case "legs/101_POOT_CDZ.glb":
      legPrice = 60
      break;
    case "legs/101_POOT_DZ.glb":
      legPrice = 120
      break;
    case "legs/101_POOT_EO_ZWART.glb":
      legPrice = 100
      break;
    default:
      legPrice = 60
  }

  bill.leg = legPrice
  price += legPrice

  let legMaterialPrice;

  switch (legTexture) {
    case "legTexture0":
      legMaterialPrice = 0
      break;
    case "legTexture1":
      legMaterialPrice = 10
      break;
    case "legTexture2":
      legMaterialPrice = 10
      break;
    case "legTexture3":
      legMaterialPrice = 20
      break;
    default:
      legMaterialPrice = 0
      break;
  }

  bill.legMaterial = legMaterialPrice
  price += legMaterialPrice

  bill.total = price

  return bill
}


export default priceCalculator