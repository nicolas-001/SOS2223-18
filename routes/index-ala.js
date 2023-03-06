const { Router } = require("express");
const router = Router();
var immigrant = new Array();
immigrant=[2.930,3.111,4.014,3.403,3.167,3.486,3.134,3.058,4.473,4.329];


function calcularMediaAritmeticaALA(immigrant) {
    let sumaTotal = 0;
    let cantidadNumeros = 0;
    
    immigrant.forEach(numero => {
      sumaTotal += numero;
      cantidadNumeros++;
    });
  
    const mediaAritmetica = sumaTotal / cantidadNumeros;
    
    return mediaAritmetica;
  }

router.get("/samples/ala", (request, response) => {
    response.json(calcularMediaAritmeticaALA(immigrant));
    console.log("New request"); });
    
    module.exports = router;