function log(msg){
    console.log(msg);
}

log("Mostramos a continuacion un Array de datos de un columna de mi propuesta");

var visitor_center = new Array();
visitor_center=[0,28,148,215,207,320,329,452,470,533];

log(visitor_center)
function calcularMediaAritmetica(visitor_center) {
    let sumaTotal = 0;
    let cantidadNumeros = 0;
    
    visitor_center.forEach(numero => {
      sumaTotal += numero;
      cantidadNumeros++;
    });
  
    const mediaAritmetica = sumaTotal / cantidadNumeros;
    
    return mediaAritmetica;
  }

  log(calcularMediaAritmetica(visitor_center))

