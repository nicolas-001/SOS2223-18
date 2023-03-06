const { Router } = require("express");
const router = Router();
const datos = [
    ['Almería', 'Hombres', 21, 2021, 13.2, 38.30],
    ['Almería', 'Hombres', 31, 2021, 40.1, 90.6],
    ['Almería', 'Hombres', 40, 2021, 57.3, 92.9],
    ['Almería', 'Hombres', 50, 2021, 54.3, 89.5],
    ['Almería',	'Hombres', 55, 2021, 31.3, 31.9],
    ['Almería',	'Hombres', 16, 2021, 196.2, 65.6],
    ['Almería', 'Mujeres', 16, 2021, 150.7,	51.8],
    ['Almería',	'Mujeres', 20, 2021, 11.2, 34.1],
    ['Almería', 'Mujeres', 30, 2021, 34.5, 81.5],
    ['Almería',	'Mujeres', 40, 2021, 41.5, 75.6]
    ];
    const valores = datos.filter(function(numero) {
      return numero[0] === 'Almería';});
      
    function calcularMediaNJO(arrays, posicion) {
    
    
        let valores = arrays.map(array => array[posicion]);
          
          
          let suma = valores.reduce((total, valor) => total + valor, 0);
          
          
          const media = suma / valores.length;
          
          return media;
        }
        router.get("/samples/njo", (request, response) => {
          response.json(calcularMediaNJO(valores,4));
          console.log("New request"); });
          module.exports = router;