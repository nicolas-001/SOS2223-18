var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 3000

app.get("/cool", (request, response) => {
    response.send(cool());
    console.log("New request");  

});
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
 
  const datos = [
    ['Almería', 'Hombres', 21, 2021, 13.2, 38.30],
    ['Almería', 'Hombres', 31, 2021, 40.1, 90.6],
    ['Almería', 'Hombres', 40, 2021, 57.3, 92.9],
    ['Almería', 'Hombres', 50, 2021, 54.3, 89.5],
    ['Almería', 'Hombres', 55, 2021, 31.3, 31.9],
    ['Almería', 'Hombres', 16, 2021, 196.2, 65.6],
    ['Almería', 'Mujeres', 16, 2021, 150.7, 51.8],
    ['Almería', 'Mujeres', 20, 2021, 11.2, 34.1],
    ['Almería', 'Mujeres', 30, 2021, 34.5, 81.5],
    ['Almería', 'Mujeres', 40, 2021, 41.5, 75.6]
    ];
    const valores = datos.filter(function(numero) {
      return numero[0] === 'Almería';});
      
    function calcularMediaNJO(arrays, posicion) {
    
    
        let valores = arrays.map(array => array[posicion]);
          
          
          let suma = valores.reduce((total, valor) => total + valor, 0);
          
          
          const media = suma / valores.length;
          
          return media;
        }
    
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


    app.get("/samples/njo", (request, response) => {
      response.json(calcularMediaNJO(valores,4));
      console.log("New request"); }); 


  
  app.get("/samples/ala", (request, response) => {
    response.json(calcularMediaAritmeticaALA(immigrant));
    console.log("New request"); }); 
  
    app.get("/samples/arm", (request, response) => {
      response.json(calcularMediaAritmeticaARM(visitor_center));
      console.log("New request"); });







    app.listen(port, () => {
    console.log(`Server ready in  port ${port}`);

});