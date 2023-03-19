
var express = require("express");
const { Router, response } = require("express");
const router = Router();
//const _ = require("underscore");
const datos = [
    ["Almeria", "Hombres", 21, 2021, 13.2, 38.30],
    ["Almeria", "Hombres", 31, 2021, 40.1, 90.6],
    ["Almeria", "Hombres", 40, 2021, 57.3, 92.9],
    ["Almeria", "Hombres", 50, 2021, 54.3, 89.5],
    ["Almeria",	"Hombres", 55, 2021, 31.3, 31.9],
    ["Almeria",	"Hombres", 16, 2021, 196.2, 65.6],
    ["Almeria", "Mujeres", 16, 2021, 150.7,	51.8],
    ["Almeria",	"Mujeres", 20, 2021, 11.2, 34.1],
    ["Almeria", "Mujeres", 30, 2021, 34.5, 81.5],
    ["Almeria",	"Mujeres", 40, 2021, 41.5, 75.6]
    ];
    const valores = datos.filter(function(numero) {
      return numero[0] === "Almeria";});
      
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
          
          var data = [];
          function createData() {
            for (let i = 0; i < 10; i++) {
              data.push(
                // Propiedades de los datos que deseamos agregar
                {"province":"Almeria", "gender":"Hombres","age": 21,"period":2021,"asset_thousand": 13.2,"tax":38.30},
                {"province":"Almeria", "gender":"Hombres", "age":31,"period": 2021,"asset_thousand": 40.1, "tax":90.6},
                {"province":"Almeria", "gender":"Hombres","age": 40, "period":2021, "asset_thousand":57.3,"tax": 92.9},
                {"province":"Almeria", "gender":"Hombres", "age":50, "period":2021, "asset_thousand":54.3,"tax": 89.5},
                {"province":"Almeria",	"gender":"Hombres", "age":55, "period":2021, "asset_thousand":31.3, "tax":31.9},
                {"province":"Almeria",	"gender":"Hombres","age": 16, "period":2021, "asset_thousand":196.2,"tax": 65.6},
                {"province":"Almeria", "gender":"Mujeres","age": 16, "period":2021, "asset_thousand":150.7,"tax":	51.8},
              {"province":"Almeria","gender":	"Mujeres", "age":20, "period":2021,"asset_thousand": 11.2, "tax":34.1},
              {"province":"Almeria", "gender":"Mujeres", "age":30, "period":2021, "asset_thousand":34.5,"tax": 81.5},
              {"province":"Almeria","gender":"Mujeres", "age":40, "period":2021,"asset_thousand": 41.5, "tax":75.6})
            }
          };

              
          const BASE_API_URL = "/api/v1"
              
        
        

          
var njoAPI = [
  {"province":"Almeria", "gender":"Hombres","age": 21,"period":2021,"asset_thousand": 13.2,"tax":38.30},
                {"province":"Sevilla", "gender":"Hombres", "age":31,"period": 2021,"asset_thousand": 40.1, "tax":90.6},
                {"province":"Almeria", "gender":"Hombres","age": 40, "period":2021, "asset_thousand":57.3,"tax": 92.9},
                {"province":"Malaga", "gender":"Hombres", "age":50, "period":2021, "asset_thousand":54.3,"tax": 89.5},
                {"province":"Almeria",	"gender":"Hombres", "age":55, "period":2021, "asset_thousand":31.3, "tax":31.9},
                {"province":"Cordoba",	"gender":"Hombres","age": 16, "period":2021, "asset_thousand":196.2,"tax": 65.6},
                {"province":"Cordoba", "gender":"Mujeres","age": 16, "period":2021, "asset_thousand":150.7,"tax":	51.8},
              {"province":"Malaga","gender":	"Mujeres", "age":20, "period":2021,"asset_thousand": 11.2, "tax":34.1},
              {"province":"Almeria", "gender":"Mujeres", "age":30, "period":2021, "asset_thousand":34.5,"tax": 81.5},
              {"province":"Almeria","gender":"Mujeres", "age":40, "period":2021,"asset_thousand": 41.5, "tax":75.6}
];
array_vacio = [];


 
//ruta api
router.get(BASE_API_URL+"/proyection-populations/loadInitialData", (request, response) => {
array_vacio=njoAPI; 
console.log("New GET request to /proyection-populations"); 
response.status(200).json({message:"OK"});

});
router.get(BASE_API_URL+"/proyection-populations", (request, response) => {
  response.json(njoAPI); 
     
  console.log("New GET request to /proyection-populations"); 
  });
  



router.post(BASE_API_URL+"/proyection-populations", (request, response) => {
  var newFact = request.body;
  const existingObject = njoAPI.find(item => item.province === newFact.province && item.gender === 
   newFact.gender && item.age === newFact.age && item.period === newFact.period);
    if (existingObject) {
      response.status(409).send(`El objeto con provincia $ newFact.province}, género $ newFact.gender}, edad $ newFact.age} y período $ newFact.period} ya existe.`);
    }

else{
  console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);

  console.log("New POST request to /proyection-populations");  
  
  njoAPI.push(newFact);
  response.status(201);}

});

router.post(BASE_API_URL+"/proyection-populations/loadInitialData", (request, response) => {
  var newFact2 = request.body;


  console.log(`newFact = ${JSON.stringify(newFact2, null, 2)}`);

  console.log("New POST request to /proyection-populations/loadInitialData");  

  data.push;(newFact2);

  response.sendStatus(201);

});

router.put(BASE_API_URL+"/proyection-populations", (request, response) => {
  var newFact = request.body;


  console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);

  console.log("No authorized method");  

  

  response.sendStatus(405);

});

router.delete(BASE_API_URL+"/proyection-populations/:province/:age", (req, res) => {
  const { province, age } = req.params;
  populations = njoAPI.filter(p => !(p.province === province && p.age.toString() === age));
  res.send(populations);
});

router.delete(BASE_API_URL+"/proyection-populations", (req, res) => {
  njoAPI = [];
  res.status(200).json("La colección ha sido eliminada correctamente");
});

router.put("/api/v1/proyection-populations/:age/:province", (req, res) => {
  const age = req.params.age;
  const province = req.params.province;
  const tax= req.params.tax;
  const asset = req.params.asset_thousand;
  const gender = req.params.gender;
  const period = req.params.period;
  const newData = req.body; // datos nuevos a actualizar
// if ( !(age&&tax&&province&&asset&&gender&&period)){
//response.sendStatus(400).json("Error, no se han pasado todos los parámetros")
 //}
 // if (parseInt(age) !== newData.age || province !== newData.province){
   // res.status(400).json("El dato pasado en la url no coincide con el del objeto a actualizar")
  //}
  //else {
    const updatedArray = njoAPI.map(obj => obj.age === parseInt(age) && obj.province===province? {...obj, ...newData} : obj);
  njoAPI = updatedArray;
  
  res.send("Objeto actualizado exitosamente");}
);
router.post("/api/v1/proyection-populations/:age", (req, res) => {
  const age = req.params.age;
  const newData = req.body; // datos nuevos a actualizar
  res.sendStatus(405);
  console.log("No authorized method");
});
router.get('/api/v1/proyection-populations/:age/:province', (req, res) => {
  // Obtener los parámetros de la URL
  const { age, province } = req.params;

  // Buscar el objeto en la colección que tenga los valores de propiedad correspondientes
  const result = njoAPI.find(item => item.age === +age && item.province === province);

  // Si se encuentra el objeto, devolverlo en la respuesta
  if (result) {
    return res.json(result);
  }

  // Si no se encuentra el objeto, devolver un error 404
  return res.status(404).json({ message: 'No se puede encontrar el objeto solicitado.' });
});
router.get('/api/v1/proyection-populations/:province', (req, res) => {
  // Obtener el valor del parámetro "age" de la URL
  const { province } = req.params;

  // Filtrar los objetos en la colección que tengan el valor de propiedad correspondiente
  const filteredItems = njoAPI.filter(item => item.province === province);

  // Si se encuentran objetos que cumplan la condición, devolverlos en la respuesta
  if (filteredItems.length > 0) {
    return res.json(filteredItems);
  }

  // Si no se encuentra ningún objeto que cumpla la condición, devolver un error 404
  return res.status(404).json({ message: 'No se puede encontrar ningún objeto que cumpla la condición.' });
});