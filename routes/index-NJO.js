
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
      console.log(`proyection-populations returned ${proyectionPopulations.length}`);
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
                console.log(`/GET en /proyection-populations?from=${from}&to=${to}`); 
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
                console.log("Nuevo GET en /proyection-populations con paginación");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                delete c._id;
                return c;
                }));
            }else if(province && period){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period);
                console.log("Nuevo GET en /proyection-populations con provincia y mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                    && r.tax >= tax && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, mes, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                    && r.tax >= tax);
                console.log("Nuevo GET en /proyection-populations con provincia, mes, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand
                  && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, mes, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.tax >= tax
                  && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, mes, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand && 
                    r.tax >= tax && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.asset_thousand >= asset_thousand);
                console.log("Nuevo GET en /proyection-populations con provincia, mes y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.tax >= tax);
                console.log("Nuevo GET en /proyection-populations con provincia, mes y tax");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, mes y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand && 
                    r.tax >= tax);
                console.log("Nuevo GET en /proyection-populations con provincia, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.tax >= tax && 
                    r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand >= asset_thousand &&
                    r.age >= age);
                console.log("Nuevo GET en /proyection-populations con provincia, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand &&
                    r.tax >= tax);
                console.log("Nuevo GET en /proyection-populations con mes, asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand &&
                    r.age >= age);
                console.log("Nuevo GET en /proyection-populations con mes, asset_thousande y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.tax >= tax &&
                    r.age >= age);
                console.log("Nuevo GET en /proyection-populations con mes, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand >= asset_thousand && r.tax >= tax
                    && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && period){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.period == period);
                console.log("Nuevo GET en /proyection-populations con provincia y mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand && tax && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand >= asset_thousand && r.tax >= tax
                    && r.age >= age);
                console.log("Nuevo GET en /proyection-populations con mes, asset_thousande, taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /proyection-populations con provincia y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && tax){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.tax == tax);
                console.log("Nuevo GET en /proyection-populations con provincia y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && age){
                const filtradas = proyectionPopulations.filter(r => r.province == province && r.age == age);
                console.log("Nuevo GET en /proyection-populations con provincia y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /proyection-populations con mes y asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && tax){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.tax == tax);
                console.log("Nuevo GET en /proyection-populations con mes y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(period && age){
                const filtradas = proyectionPopulations.filter(r => r.period == period && r.age == age);
                console.log("Nuevo GET en /proyection-populations con mes y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && tax){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand && r.tax == tax);
                console.log("Nuevo GET en /proyection-populations con asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand && age){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand && r.age == age);
                console.log("Nuevo GET en /proyection-populations con asset_thousande y taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(tax && age){
                const filtradas = proyectionPopulations.filter(r => r.tax == tax && r.age == age);
                console.log("Nuevo GET en /proyection-populations con taxe y age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if (period) {
                const filtradas = proyectionPopulations.filter(r => r.period === parseInt(period));
                console.log("Nuevo GET en /proyection-populations con mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
                
            } else if(province){
                const filtradas = proyectionPopulations.filter(r => r.province === province);
                console.log("Nuevo GET en /proyection-populations con provincia");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(asset_thousand){
                const filtradas = proyectionPopulations.filter(r => r.asset_thousand == asset_thousand);
                console.log("Nuevo GET en /proyection-populations con asset_thousande");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(tax){
                const filtradas = proyectionPopulations.filter(r => r.tax == tax);
                console.log("Nuevo GET en /proyection-populations con taxe");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(age){
                const filtradas = proyectionPopulations.filter(r => r.age == age);
                console.log("Nuevo GET en /proyection-populations con age");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else {
                console.log("Nuevo GET en /proyection-populations"); 
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
  
router.get(BASE_API_URL+"/proyection-populations/:province", (request, response) => {
  const province = request.params.province;
  const from = request.query.from;
  const to = request.query.to;
  db.find({}, (err, proyectionPopulations)=>{
      if (from && to && !err) {
          if (from > to) {
              response.status(400).json("El rango de meses especificado es inválido");
          } else {
              const datosFiltrados = proyectionPopulations.filter(x => x.province === province && x.period >= from && x.period <= to);
              response.status(200).json(datosFiltrados.map((c) =>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /proyection-populations/${province}?from=${from}&to=${to}`);
          }
      }else if(!err){
          const datosFiltrados = proyectionPopulations.filter(x => x.province == province);
          
          if(datosFiltrados.length == 0){
              response.status(404).json('La ruta solicitada no existe');
          }else{
          response.status(200).json(datosFiltrados.map((c)=>{
              delete c._id;
              return c;
          }));
          console.log(`New GET /proyection-populations/${province}`); 
          }
          console.log(`Nuevo GET en /proyection-populations/${province}`); 
      }else{
          response.sendStatus(500);
          console.log("No se ha podido hacer la busqueda");
      }
  });    
});

router.get(BASE_API_URL+"/proyection-populations/:province/:period", (request,response) => {
  const province = request.params.province;
  const period = request.params.period;
  db.find({}, (err, proyectionPopulations)=>{
      if(!err){
          var filtro = proyectionPopulations.filter(x => x.province == province && x.period == period);
          if (filtro.length == 0) {            
              response.status(404).json('La ruta solicitada no existe');
          } else {
              response.status(200).json(filtro.map((c)=>{
                  delete c._id;
                  return c;
              }));
          }
      }else{
          console.log("No se ha podido obtener los datos");
          response.sendStatus(500);
      }   
  });
  console.log("Datos de /proyection-populations/:province/:period");
});

router.post(BASE_API_URL + "/proyection-populations", (request, response) => {
  const province = request.body.province;
  const period = request.body.period;                   
  const asset_thousand = request.body.asset_thousand;
  const tax = request.body.tax;
  const age = request.body.age;
  const gender = request.query.gender;

  db.find({},function(err,filteredList){

      if(err){
          response.sendStatus(500);
      }

      // Validar que se envíen todos los campos necesarios
      const requiredFields = ['province', 'period', 'asset_thousand', 'tax', 'age','gender'];
      for (const field of requiredFields) {
          if (!request.body.hasOwnProperty(field)) {
          return response.status(400).json(`Missing required field: ${field}`);
          }
      }
      // Verificar que la solicitud se hizo en la ruta correcta
      if (request.originalUrl != BASE_API_URL+"/proyection-populations") {
          response.status(405).json('Url no permitida');
      }else{ 

          
          filteredList = filteredList.filter((obj)=>
                          {
                              return(province == obj.province && period == obj.period && asset_thousand == obj.asset_thousand &&
                                  tax == obj.tax && age == obj.age && gender == obj.gender)
                          });
          //const existingObject = db.find({territory : NewEvolution.territory, period : NewEvolution.period});
          if (filteredList.length !=0) {
              // Si el recurso ya existe, devolver un código de respuesta 409
              response.status(409).json(`El recurso ya existe.`);
          } else {
              // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
              db.insert(request.body);
              //evolution_stats.push(request.body);
              response.sendStatus(201);
              console.log("Se ha insertado un nuevo dato");
          }
      }
    });
    console.log("New POST to /proyection-populations"); 
  });
  router.post(BASE_API_URL+"/proyection-populations/:province", (request, response) =>{
    console.log("No se puede hacer este POST /proyection-populations/:province");
    response.sendStatus(405);
  });
  router.put(BASE_API_URL + "/proyection-populations/:province", (request, response) => {
    const province = request.params.province;
    const body = request.body;
    if (province === body.province) {
        const requiredFields = ['province', 'period', 'tax', 'asset_thousand', 'gender','age'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Falta alguno de los campos: ${field}`);
                }
            }
    
        db.update({ province: province }, 
            { $set: 
                { period: body.period, 
                tax: body.tax, 
                asset_thousand: body.asset_thousand, 
                gender: body.gender,
              age: body.age} }, {}, (err, numAffected) => {
            if (err) {
                console.log("Error actualizando el objeto: ", err);
                response.status(500).send("Error actualizando el objeto");
            } else if (numAffected === 0) {
                console.log("No se ha encontrado el objeto con la provincia especificada");
                response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
            } else {
                console.log("Nuevo objeto actualizado en la base de datos");
                response.status(200).send("Actualizado");
            }
        });
    }else {
        console.log("La provincia en la URL no coincide con la provincia en la solicitud");
        response.status(400).send("La provincia en la URL no coincide con la provincia en la solicitud");
    }
});
router.put(BASE_API_URL + "/proyection-populations/:province/:period", (request, response) => {
  const provinceId = request.params.province;
  const periodId = parseInt(request.params.period);
  const body = request.body;

  // Verifica si los valores de año coinciden
  if (provinceId === body.province && periodId === body.period) {
      // Actualiza el registro en la base de datos
      db.update(
          { province: provinceId, period: periodId },
          { $set: {
            period: body.period, 
            tax: body.tax, 
            asset_thousand: body.asset_thousand, 
            gender: body.gender,
          age: body.age
          }},
          {},
          function (err, numReplaced) {
              if (numReplaced === 1) {
                  console.log("Nuevo PUT a /proyection-populations/:province/:period");
                  response.status(200).send("Actualizado");
              } else {
                  console.log("No se ha encontrado el objeto con la provincia y mes especificados");
                  response.status(400).send("No se ha encontrado el objeto con la provincia y mes especificados");
              }
          }
      );
  } else {
      console.log("El mes en la URL no coincide con el mes en la solicitud");
      response.status(400).send("El mes en la URL no coincide con el mes en la solicitud");
  }
});

router.delete(BASE_API_URL+"/proyection-populations/:province", (request, response) => {
  const province = request.params.province;
  db.remove({province : province}, {}, (err, numRemoved)=>{
      if(err){
          console.log("Error para borrar todos los datos");
          response.status(500).send("Error");

      }else if(numRemoved === 0){
          console.log("No se encuentran datos");
          response.status(400).send("No se encuentran datos");
      }else{
          console.log("Borrado el dato");
          response.status(200).send("Se ha borrado el dato");
      }
  
  });
  console.log("Se ha borrado la provincia en /proyection-populations/:province");
});

// DELETE de provincia y año
router.delete(BASE_API_URL+"/proyection-populations/:province/:period", (request, response) => {
  const province = request.params.province;
  const period = request.params.period;
  db.remove({province : province , period : parseInt(period)}, {}, (err, numRemoved)=>{
      if(err){
          console.log("Error para borrar todos los datos");
          response.status(500).send("Error");

      }else if(numRemoved == 0){
          console.log("No se encuentran datos");
          response.status(400).send("No se encuentran datos");
      }else{
          console.log("Borrado el dato");
          response.status(200).send("Se ha borrado el dato");
      }
  });
  console.log("Se ha borrado la provincia en /proyection-populations/:province");
});
router.delete(BASE_API_URL+"/proyection-populations/", (req, res) => {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`Se eliminaron ${numRemoved} documentos de la colección.`);
    }
  });
});


