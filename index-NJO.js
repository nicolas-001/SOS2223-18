let datos = [
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



function calcularMediaPorPosicion(arrays, posicion) {
    // Mappeamos cada array y seleccionamos la posición indicada
    let valores = arrays.map(array => array[posicion]);
    
    // Sumamos los valores
    let suma = valores.reduce((total, valor) => total + valor, 0);
    
    // Calculamos la media aritmética
    const media = suma / valores.length;
    
    return media;
  }
  console.log(datos);    
  let media = calcularMediaPorPosicion(datos, 2);
      console.log(media); 