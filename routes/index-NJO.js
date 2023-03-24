
var express = require("express");
const { Router, response } = require("express");
const router = Router();
var Datastore = require("nedb");
var db = new Datastore();
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
          
          
          let suma = valores.reduce((age, valor) => age + valor, 0);
          
          
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
  console.log("New GET to /proyection-populations");
  db.find({}, (err, proyectionPopulations)=>{
  if(proyectionPopulations.length>0){
      response.json("Los datos proyection-populations estan cargados.");
      console.log("Los datos proyection-populations estan cargados.")
  }else if(err){
          console.log(`Error geting /proyection-populations/loadInitialData: ${err}`);
          response.sendStatus(500);
  }else{
      db.insert(njoAPI)
      console.log(`residential-variations-stats returned ${proyectionPopulations.length}`);
      response.sendStatus(200);
  }
  });
  });
  router.get(BASE_API_URL+"/proyection-populations", (request, response) => {
    const from = request.query.from;
    const to = request.query.to;
    db.find({}, (err, proyectionPopulations)=>{
        if (from && to && !err) {
            const provinciasAño = proyectionPopulations.filter(x => {return x.period >= from && x.period <= to}); 
            if (from >= to) {
                response.status(400).json("El rango de meses especificado es inválido");
            
            }else{
                response.status(200);
                response.json(provinciasAño.map((c)=>{
                    delete c._id;
                    return c;
                }));
                console.log(`/GET en /residential-variations-stats?from=${from}&to=${to}`); 
            }
        }else if(!err){
            const province = request.query.province;
            const period = request.query.period;
            const asset_thousand = request.query.asset_thousand;
            const tax = request.query.tax;
            const age = request.query.age;
            const gender = request.query.gender;
            const limit = request.query.limit;
            const offset = request.query.offset;
            
            if(limit && offset){ 
                const filtradas = pagination(request,proyectionPopulations);
                console.log("Nuevo GET en /residential-variations-stats con paginación");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                delete c._id;
                return c;
                }));
            }else if(province && period){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period);
                console.log("Nuevo GET en /residential-variations-stats con provincia y mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                    && r.tax >= tax && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                    && r.tax >= tax);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                  && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.tax >= tax
                  && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand && 
                    r.tax >= tax && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.tax >= tax);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes y tax");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, mes y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand && 
                    r.tax >= tax);
                console.log("Nuevo GET en /residential-variations-stats con provincia, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.tax >= tax && 
                    r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand &&
                    r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con provincia, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand &&
                    r.tax >= tax);
                console.log("Nuevo GET en /residential-variations-stats con mes, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand &&
                    r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con mes, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.tax >= tax &&
                    r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con mes, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand >= asset_thousand && r.tax >= tax
                    && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period);
                console.log("Nuevo GET en /residential-variations-stats con provincia y mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand && r.tax >= tax
                    && r.age >= age);
                console.log("Nuevo GET en /residential-variations-stats con mes, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /residential-variations-stats con provincia y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.tax == tax);
                console.log("Nuevo GET en /residential-variations-stats con provincia y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.age == age);
                console.log("Nuevo GET en /residential-variations-stats con provincia y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /residential-variations-stats con mes y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && tax){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.tax == tax);
                console.log("Nuevo GET en /residential-variations-stats con mes y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.age == age);
                console.log("Nuevo GET en /residential-variations-stats con mes y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand && r.tax == tax);
                console.log("Nuevo GET en /residential-variations-stats con asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand && r.age == age);
                console.log("Nuevo GET en /residential-variations-stats con asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(tax && age){
                const filtradas = proyectionPopulations.filter(r => r.tax == tax && r.age == age);
                console.log("Nuevo GET en /residential-variations-stats con taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if (period) {
                const filtradas = proyectionPopulations.filter(r => r.period === parseInt(period));
                console.log("Nuevo GET en /residential-variations-stats con mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
                
            } else if(province){
                const filtradas = proyectionPopulations.filter(r => r.province === province);
                console.log("Nuevo GET en /residential-variations-stats con provincia");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /residential-variations-stats con asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(tax){
                const filtradas = proyectionPopulations.filter(r => r.tax == tax);
                console.log("Nuevo GET en /residential-variations-stats con taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(age){
                const filtradas = proyectionPopulations.filter(r => r.age == age);
                console.log("Nuevo GET en /residential-variations-stats con age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else {
                console.log("Nuevo GET en /residential-variations-stats"); 
                response.status(200);
                response.json(proyectionPopulations.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }  
        }else{
            console.log("Error al dar los datos");
            response.sendStatus(500);
        }
    });
    console.log("GET con los datos");
});
function pagination(request, lista){
  var res = [];
  const limit = request.query.limit;
  const offset = request.query.offset;
  
  if(limit < 1 || offset < 0 || offset > lista.length){
      res.push("Hay un error en los parametros offset y limit");
      return res;
  }else{
  res = lista.slice(offset,parseInt(limit)+parseInt(offset));
  return res;
  }     
};
  



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
