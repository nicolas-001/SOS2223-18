const { Router,response } = require("express");
const router = Router();

var Datastore = require('nedb');
var db= new Datastore();

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

    var data = [];
          function createData() {
            for (let i = 0; i < 10; i++) {
              data.push[
                {
                    "Province": "Almeria",
                    "Month": "Enero",
                    "immigrant": 2930,
                    "emigrant": 3334,
                    "total": 6264
                },
                {
                    "Province": "Almeria",
                    "Month": "Febrero",
                    "immigrant": 3111,
                    "emigrant": 2992,
                    "total": 6103
                },
                {
                    "Province": "Almeria",
                    "Month": "Marzo",
                    "immigrant": 4014,
                    "emigrant": 4562,
                    "total": 8576
                },
                {
                    "Province": "Almeria",
                    "Month": "Abril",
                    "immigrant": 3403,
                    "emigrant": 2815,
                    "total": 6218
                },
                {
                    "Province": "Almeria",
                    "Month": "Mayo",
                    "immigrant": 3167,
                    "emigrant": 2738,
                    "total": 5905
                },
                {
                    "Province": "Almeria",
                    "Month": "Junio",
                    "immigrant": 3486,
                    "emigrant": 3142,
                    "total": 6628
                },
                {
                    "Province": "Almeria",
                    "Month": "Julio",
                    "immigrant": 3134,
                    "emigrant": 3375,
                    "total": 6509
                },
                {
                    "Province": "Almeria",
                    "Month": "Agosto",
                    "immigrant": 3058,
                    "emigrant": 2087,
                    "total": 5145
                },
                {
                    "Province": "Almeria",
                    "Month": "Septiembre",
                    "immigrant": 4473,
                    "emigrant": 4074,
                    "total": 8547
                },
                {
                    "Province": "Almeria",
                    "Month": "Octubre",
                    "immigrant": 4329,
                    "emigrant": 3836,
                    "total": 8165
                }
                
            ];
            }
          };

              
          const BASE_API_URL = "/api/v1"

    db.insert(data);
    console.log("New GET to /contacts")


var alaAPI = [
    {
        "Province": "Almeria",
        "Month": "Enero",
        "immigrant": 2930,
        "emigrant": 3334,
        "total": 6264
    },
    {
        "Province": "Almeria",
        "Month": "Febrero",
        "immigrant": 3111,
        "emigrant": 2992,
        "total": 6103
    },
    {
        "Province": "Almeria",
        "Month": "Marzo",
        "immigrant": 4014,
        "emigrant": 4562,
        "total": 8576
    },
    {
        "Province": "Almeria",
        "Month": "Abril",
        "immigrant": 3403,
        "emigrant": 2815,
        "total": 6218
    },
    {
        "Province": "Almeria",
        "Month": "Mayo",
        "immigrant": 3167,
        "emigrant": 2738,
        "total": 5905
    },
    {
        "Province": "Almeria",
        "Month": "Junio",
        "immigrant": 3486,
        "emigrant": 3142,
        "total": 6628
    },
    {
        "Province": "Almeria",
        "Month": "Julio",
        "immigrant": 3134,
        "emigrant": 3375,
        "total": 6509
    },
    {
        "Province": "Almeria",
        "Month": "Agosto",
        "immigrant": 3058,
        "emigrant": 2087,
        "total": 5145
    },
    {
        "Province": "Almeria",
        "Month": "Septiembre",
        "immigrant": 4473,
        "emigrant": 4074,
        "total": 8547
    },
    {
        "Province": "Almeria",
        "Month": "Octubre",
        "immigrant": 4329,
        "emigrant": 3836,
        "total": 8165
    }
    
];

var alaVacia = []



//ruta api

router.get(BASE_API_URL+"/residential-variations-stats/loadInitialData", (request, response) => {
  array_vacio=alaAPI; 
  console.log("New GET request to /residential-variations-stats"); 
  response.status(200).json({message:"OK"});
  
  });
  router.get(BASE_API_URL+"/residential-variations-stats", (request, response) => {
    response.json(alaAPI); 
       
    console.log("New GET request to /residential-variations-stats"); 
    });
    
  
  
  
  router.post(BASE_API_URL+"/residential-variations-stats", (request, response) => {
    var newFact = request.body;
    const existingObject = alaAPI.find(item => item.Province === newFact.Province && item.Month === 
     newFact.Month && item.immigrant === newFact.immigrant && item.emigrant === newFact.emigrant && item.total == newFact.total);
      if (existingObject) {
        response.status(409).send(`El objeto con provincia $ newFact.Province}, mes $ newFact.Month}, numero de immigrantes $ newFact.immigrant} y numero de emigrantes $ newFact.emigrant} ya existe.`);
      }
  
  else{
    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);
  
    console.log("New POST request to /residential-variations-stats");  
    
    alaAPI.push(newFact);
    response.status(201);}
  
  });
  
  router.post(BASE_API_URL+"/residential-variations-stats/loadInitialData", (request, response) => {
    var newFact2 = request.body;
  
  
    console.log(`newFact = ${JSON.stringify(newFact2, null, 2)}`);
  
    console.log("New POST request to /residential-variations-stats/loadInitialData");  
  
    data.push;(newFact2);
  
    response.sendStatus(201);
  
  });
  
  router.put(BASE_API_URL+"/residential-variations-stats", (request, response) => {
    var newFact = request.body;
  
  
    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);
  
    console.log("No authorized method");  
  
    
  
    response.sendStatus(405);
  
  });
  
  router.delete(BASE_API_URL+"/residential-variations-stats/:Province/:Month", (req, res) => {
    const { Province, Month } = req.params;
    variations = alaAPI.filter(p => !(p.Province === Province && p.Month === Month));
    res.send(variations);
  });
  
  router.delete(BASE_API_URL+"/residential-variations-stats", (req, res) => {
    alaAPI = [];
    res.status(200).json("La colección ha sido eliminada correctamente");
  });
  
  router.put("/api/v1/residential-variations-stats/:Month/:Province", (req, res) => {
    const Month = req.params.Month;
    const Province = req.params.Province;
    const immigrant= req.params.immigrant;
    const emigrant = req.params.emigrant;
    const total = req.params.total;
    const newData = req.body; // datos nuevos a actualizar
  // if ( !(age&&tax&&province&&asset&&gender&&period)){
  //response.sendStatus(400).json("Error, no se han pasado todos los parámetros")
   //}
   // if (parseInt(age) !== newData.age || province !== newData.province){
     // res.status(400).json("El dato pasado en la url no coincide con el del objeto a actualizar")
    //}
    //else {
      const updatedArray = alaAPI.map(obj => obj.Month === parseInt(Month) && obj.Province===Province? {...obj, ...newData} : obj);
    alaAPI = updatedArray;
    
    res.send("Objeto actualizado exitosamente");}
  );
  router.post("/api/v1/residential-variations-stats/:Month", (req, res) => {
    const Month = req.params.Month;
    const newData = req.body; // datos nuevos a actualizar
    res.sendStatus(405);
    console.log("No authorized method");
  });
  router.get('/api/v1/residential-variations-stats/:Month/:Province', (req, res) => {
    // Obtener los parámetros de la URL
    const { Month, Province } = req.params;
  
    // Buscar el objeto en la colección que tenga los valores de propiedad correspondientes
    const result = alaAPI.find(item => item.Month === +Month && item.Province === Province);
  
    // Si se encuentra el objeto, devolverlo en la respuesta
    if (result) {
      return res.json(result);
    }
  
    // Si no se encuentra el objeto, devolver un error 404
    return res.status(404).json({ message: 'No se puede encontrar el objeto solicitado.' });
  });
  router.get('/api/v1/residential-variations-stats/:Province', (req, res) => {
    // Obtener el valor del parámetro "age" de la URL
    const { Province } = req.params;
  
    // Filtrar los objetos en la colección que tengan el valor de propiedad correspondiente
    const filteredItems = alaAPI.filter(item => item.Province === Province);
  
    // Si se encuentran objetos que cumplan la condición, devolverlos en la respuesta
    if (filteredItems.length > 0) {
      return res.json(filteredItems);
    }
  
    // Si no se encuentra ningún objeto que cumpla la condición, devolver un error 404
    return res.status(404).json({ message: 'No se puede encontrar ningún objeto que cumpla la condición.' });
  });