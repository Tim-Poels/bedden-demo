const priceCalculator = () => {
  let width = parseInt(sessionStorage.getItem("currentWidth"), 10)
  let lenght = parseInt(sessionStorage.getItem("currentLength"), 10)
  let texture = sessionStorage.getItem("texture")
  let leg = sessionStorage.getItem("currentLeg")
  let legTexture = sessionStorage.getItem("currentLegTexture")
  
  let bill = {}

  let price = 149.99;

  let framePrice = 0;

  if (width) framePrice += width
  else framePrice += 200

  if (lenght) framePrice += lenght
  else framePrice += 220

  bill.frame = framePrice / 2;
  
  price += framePrice / 2;

  bill.matres = (framePrice - 20) / 2;

  price += (framePrice - 20) / 2;

  let texturePrice;

  switch (texture) {
    case "Ash Grey":
      texturePrice = 50
      break;
    case "Bordeaux":
      texturePrice = 70
      break;
    case "Dark Yellow":
      texturePrice = 60
      break;
    case "Warm Orange":
      texturePrice = 80
      break;
    case "Dark Blue":
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
      legPrice = 10
      break;
    case "legs/101_POOT_B_ALU.glb":
      legPrice = 20
      break;
    case "legs/101_POOT_CDZ.glb":
      legPrice = 30
      break;
    case "legs/101_POOT_DZ.glb":
      legPrice = 20
      break;
    case "legs/101_POOT_EO_ZWART.glb":
      legPrice = 30
      break;
    default:
      legPrice = 10
  }

  bill.leg = legPrice
  price += legPrice

  let legMaterialPrice;

  switch (legTexture) {
    case "legTexture0":
      legMaterialPrice = 50
      break;
    case "legTexture1":
      legMaterialPrice = 60
      break;
    case "legTexture2":
      legMaterialPrice = 50
      break;
    case "legTexture3":
      legMaterialPrice = 70
      break;
    default:
      legMaterialPrice = 50
      break;
  }

  bill.legMaterial = legMaterialPrice
  price += legMaterialPrice


  bill.total = price

  return bill
}


export default priceCalculator