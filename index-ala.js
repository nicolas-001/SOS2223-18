function log(msg){
    console.log(msg);
}

log("Mostramos a continuacion un Array de datos de un columna de mi propuesta");

var immigrant = new Array();
immigrant=[2.930,3.111,4.014,3.403,3.167,3.486,3.134,3.058,4.473,4.329];

log(immigrant)
function calcularMediaAritmetica(immigrant) {
    let sumaTotal = 0;
    let cantidadNumeros = 0;
    
    immigrant.forEach(numero => {
      sumaTotal += numero;
      cantidadNumeros++;
    });
  
    const mediaAritmetica = sumaTotal / cantidadNumeros;
    
    return mediaAritmetica;
  }

  log(calcularMediaAritmetica(immigrant))






