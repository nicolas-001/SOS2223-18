const { Router } = require("express");
const router = Router();

var visitor_center = new Array();
visitor_center=[0,28,148,215,207,320,329,452,470,533];
function calcularMediaAritmeticaARM(visitor_center) {
  let sumaTotal = 0;
  let cantidadNumeros = 0;
  
  visitor_center.forEach(numero => {
    sumaTotal += numero;
    cantidadNumeros++;
  });

  const mediaAritmetica = sumaTotal / cantidadNumeros;
  
  return mediaAritmetica;
}
router.get("/samples/arm", (request, response) => {
    response.json(calcularMediaAritmeticaARM(visitor_center));
    console.log("New request"); });
    module.exports = router;