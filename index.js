var express = require("express");
var cool = require("cool-ascii-faces");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000
app.use(bodyParser.json());
/*
//Aqui empieza la api con mi el Array de Adrian
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
    }
    
];

var alaVacia = []

const BASE_API_URL = "/api/v1" 
//ruta api
app.get(BASE_API_URL+"/badea", (request, response) => {
    response.json(alaAPI);
    console.log("New GET request to /badea");  

});

app.get(BASE_API_URL+"/badea/loadInitialData", (request, response) => {
    response.json(alaVacia);
    console.log("New GET request to /badea/loadInitialData");  

});

app.post(BASE_API_URL+"/badea", (request, response) => {
    var newFact = request.body;
    const existingObject = alaAPI.find(item => item.Province === newFact.Province && item.Month === 
     newFact.Moth && item.immigrant === newFact.immigrant && item.emigrant === newFact.emigrant);
      if (existingObject) {
        response.status(409).send(`El objeto con provincia $ newFact.province}, género $ newFact.gender}, edad $ newFact.age} y período $ newFact.period} ya existe.`);
      }
  
  else{
    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);
  
    console.log("New POST request to /badea");  
    
    alaAPI.push(newFact);
    response.json(alaAPI);
    response.sendStatus(201);}
  
  });


app.post(BASE_API_URL+"/badea", (request, response) => {
    var newFact = request.body;


    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);

    console.log("New POST request to /badea");  

    alaAPI.push(newFact);

    response.sendStatus(201);

});

app.post(BASE_API_URL+"/badea/loadInitialData", (request, response) => {
    var newFact = request.body;
    const existingObject = alaVacia.find(item => item.Province === newFact.Province && item.Month === 
     newFact.Moth && item.immigrant === newFact.immigrant && item.emigrant === newFact.emigrant);
      if (existingObject) {
        response.status(409).send(`El objeto con provincia $ newFact.Province}, mes $ newFact.Month}, immigrant $ newFact.immigrant} y emigrant $ newFact.emigrant} ya existe.`);
      }
  
  else{
    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);
  
    console.log("New POST request to /badea/loadInitialData");  
    
    alaVacia.push(newFact);
    response.json(alaVacia);
    response.sendStatus(201);}
  
  });


app.post(BASE_API_URL+"/badea/loadInitialData", (request, response) => {
    var newFact2 = request.body;


    console.log(`newFact = ${JSON.stringify(newFact2, null, 2)}`);

    console.log("New POST request to /badea/loadInitialData");  

    alaVacia.push(newFact2);

    response.sendStatus(201);

});

app.put(BASE_API_URL+"/badea", (request, response) => {
    var newFact = request.body;
  
  
    console.log(`newFact = ${JSON.stringify(newFact, null, 2)}`);
  
    console.log("No authorized method");  
  
    
  
    response.sendStatus(400);
  
  });

  
  app.delete("/api/v1/badea/:Month", (req, res) => {
    const monthToDelete = req.params.Month;
    alaAPI = alaAPI.filter(item => item.Month !== monthToDelete);
    res.json(alaAPI);
    res.send(`El objeto con provincia ${monthToDelete} ha sido eliminado.`);
  });
  
  app.put("/api/v1/badea/:immigrant", (req, res) => {
    const immigrant = req.params.immigrant;
    const newData = req.body; // datos nuevos a actualizar
    const updatedArray = alaAPI.map(obj => obj.immigrant === parseInt(immigrant) ? {...obj, ...newData} : obj);
    alaAPI = updatedArray;
    res.json(alaAPI);
    res.send("Objeto actualizado exitosamente");
  });
  app.post("/api/v1/badea/:immigrant", (req, res) => {
    const immigrant = req.params.immigrant;
    const newData = req.body; // datos nuevos a actualizar
    res.sendStatus(405);
    console.log("No authorized method");
  });


//Aqui termina la api con mi el Array de Adrian
*/


//Ruta para caras ascii
app.get("/cool", (request, response) => {
    response.send(cool());
    console.log("New request");  
});

//Rutas

    app.use(require('./routes/index-NJO')) ;
    app.use(require('./routes/index-arm')) ;
    app.use(require('./routes/index-ala')) ;


    app.listen(port, () => {
    console.log(`Server ready in  port ${port}`);

});