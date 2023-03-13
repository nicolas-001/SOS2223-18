
const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const datos = [
    ["Almería", "Hombres", 21, 2021, 13.2, 38.30],
    ["Almería", "Hombres", 31, 2021, 40.1, 90.6],
    ["Almería", "Hombres", 40, 2021, 57.3, 92.9],
    ["Almería", "Hombres", 50, 2021, 54.3, 89.5],
    ["Almería",	"Hombres", 55, 2021, 31.3, 31.9],
    ["Almería",	"Hombres", 16, 2021, 196.2, 65.6],
    ["Almería", "Mujeres", 16, 2021, 150.7,	51.8],
    ["Almería",	"Mujeres", 20, 2021, 11.2, 34.1],
    ["Almería", "Mujeres", 30, 2021, 34.5, 81.5],
    ["Almería",	"Mujeres", 40, 2021, 41.5, 75.6]
    ];
    const valores = datos.filter(function(numero) {
      return numero[0] === "Almería";});
      
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
                {"province":"Almería", "gender":"Hombres","age": 21,"period":2021,"asset_thousand": 13.2,"tax":38.30},
                {"province":"Almería", "gender":"Hombres", "age":31,"period": 2021,"asset_thousand": 40.1, "tax":90.6},
                {"province":"Almería", "gender":"Hombres","age": 40, "period":2021, "asset_thousand":57.3,"tax": 92.9},
                {"province":"Almería", "gender":"Hombres", "age":50, "period":2021, "asset_thousand":54.3,"tax": 89.5},
                {"province":"Almería",	"gender":"Hombres", "age":55, "period":2021, "asset_thousand":31.3, "tax":31.9},
                {"province":"Almería",	"gender":"Hombres","age": 16, "period":2021, "asset_thousand":196.2,"tax": 65.6},
                {"province":"Almería", "gender":"Mujeres","age": 16, "period":2021, "asset_thousand":150.7,"tax":	51.8},
              {"province":"Almería","gender":	"Mujeres", "age":20, "period":2021,"asset_thousand": 11.2, "tax":34.1},
              {"province":"Almería", "gender":"Mujeres", "age":30, "period":2021, "asset_thousand":34.5,"tax": 81.5},
              {"province":"Almería","gender":"Mujeres", "age":40, "period":2021,"asset_thousand": 41.5, "tax":75.6})
            }
          };

              
          const BASE_API_URL = "/api/v1"
              
        
          
          // Función de middleware para cargar datos iniciales
          function loadInitialData(req, res, next) {
            if (data.length === 0) {
              createData();
            }
            next();
          }
          
          // Ruta para cargar datos iniciales
          router.get(BASE_API_URL+"/proyection-populations/loadInitialData", loadInitialData, (req, res) => {
            res.json(data);
            res.status(200).json({ message: "Datos cargados correctamente." });
          });

          
var njoAPI = [
  {
      "province": "Almeria",
      "gender": "Hombres",
      "age": 20,
      "period": 2021,
      "asset_thousand": 13.2,
      "tax":38.3
  },
  {
    "province": "Cordoba",
    "gender": "Hombres",
    "age": 30,
    "period": 2021,
    "asset_thousand": 40.1,
    "tax":90.6
  },
];



 
//ruta api
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
  response.json(njoAPI);
  response.sendStatus(201);}

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

router.delete("/api/v1/proyection-populations/:province", (req, res) => {
  const provinceToDelete = req.params.province;
  njoAPI = njoAPI.filter(item => item.province !== provinceToDelete);
  res.json(njoAPI);
  res.send(`El objeto con provincia ${provinceToDelete} ha sido eliminado.`);
});

router.put("/api/v1/proyection-populations/:age", (req, res) => {
  const age = req.params.age;
  const newData = req.body; // datos nuevos a actualizar
  const updatedArray = njoAPI.map(obj => obj.age === parseInt(age) ? {...obj, ...newData} : obj);
  njoAPI = updatedArray;
  res.json(njoAPI);
  res.send("Objeto actualizado exitosamente");
});
router.post("/api/v1/proyection-populations/:age", (req, res) => {
  const age = req.params.age;
  const newData = req.body; // datos nuevos a actualizar
  res.sendStatus(405);
  console.log("No authorized method");
});