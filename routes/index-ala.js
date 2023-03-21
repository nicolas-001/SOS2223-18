const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

    
module.exports = (app) =>{

    var datos = [
          
      {
        Province: "Almeria",
        Month: "Enero",
        immigrant: 2930,
        emigrant: 3334,
        total: 6264
      },
      {
        Province: "Almeria",
        Month: "Febrero",
        immigrant: 3111,
        emigrant: 2992,
        total: 6103
      },
      {
        Province: "Almeria",
        Month: "Marzo",
        immigrant: 4014,
        emigrant: 4562,
        total: 8576
      },
      {
        Province: "Almeria",
        Month: "Abril",
        immigrant: 3403,
        emigrant: 2815,
        total: 6218
      },
      {
        Province: "Almeria",
        Month: "Mayo",
        immigrant: 3167,
        emigrant: 2738,
        total: 5905
      },
      {
        Province: "Almeria",
        Month: "Junio",
        immigrant: 3486,
        emigrant: 3142,
        total: 6628
      },
      {
        Province: "Almeria",
        Month: "Julio",
        immigrant: 3134,
        emigrant: 3375,
        total: 6509
      },
      {
        Province: "Almeria",
        Month: "Agosto",
        immigrant: 3058,
        emigrant: 2087,
        total: 5145
      },
      {
        Province: "Almeria",
        Month: "Septiembre",
        immigrant: 4473,
        emigrant: 4074,
        total: 8547
      },
      {
        Province: "Almeria",
        Month: "Octubre",
        immigrant: 4329,
        emigrant: 3836,
        total: 8165
      }            
                
    ]
            

            

    db.insert(datos);
    console.log("New GET to /data")


//redireccionar

//app.get(BASE_API_URL+'/residential-variations-stats/docs', (req, res) => {
//  res.redirect('');
//});


//ruta api
//GET carga

    app.get(BASE_API_URL+"/residential-variations-stats/loadInitialData", (request,response) => {
        console.log("New GET to /residential-variations-stats");
        db.find({}, (err, residentialVariationsStats)=>{
        if(residentialVariationsStats.length>0){
            response.json("Los datos residential-variations-stats estan cargados.");
            console.log("Los datos residential-variations-stats estan cargados.")
        }else if(err){
                console.log(`Error geting /residential-variations-stats/loadInitialData: ${err}`);
                response.sendStatus(500);
        }else{
            db.insert(datos)
            console.log(`residential-variations-stats returned ${residentialVariationsStats.length}`);
            response.sendStatus(200);
        }
        });
        
    });
    
    // GET datos y tambien from y to
    app.get(BASE_API_URL+"/residential-variations-stats", (request, response) => {
      const from = request.query.from;
      const to = request.query.to;
      db.find({}, (err, residentialVariationsStats)=>{
          if (from && to && !err) {
              const provinciasMes = residentialVariationsStats.filter(x => {return x.Month >= from && x.Month <= to}); 
              if (from >= to) {
                  response.status(400).json("El rango de meses especificado es inválido");
              
              }else{
                  response.status(200);
                  response.json(provinciasMes.map((c)=>{
                      delete c._id;
                      return c;
                  }));
                  console.log(`/GET en /residential-variations-stats?from=${from}&to=${to}`); 
              }
          }else if(!err){
              const Province = request.query.Province;
              const Month = request.query.Month;
              const immigrant = request.query.immigrant;
              const emigrant = request.query.emigrant;
              const total = request.query.total;
              const limit = request.query.limit;
              const offset = request.query.offset;
              
              if(limit && offset){ 
                  const filtradas = pagination(request,residentialVariationsStats);
                  console.log("Nuevo GET en /residential-variations-stats con paginación");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
                  }));
              }else if(Province && Month){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == MOnth);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y mes");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && immigrant && immigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.immigrant >= immigrant
                      && r.emigrant >= emigrant && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes, immigrante, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && immigrant && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.immigrant >= immigrant
                      && r.emigrant >= emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes, immigrante y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && immigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.immigrant >= immigrant
                    && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes, immigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.emigrant >= emigrant
                    && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && immigrant && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.immigrant >= immigrant && 
                      r.emigrant >= emigrant && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, immigrante, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && immigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.immigrant >= immigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes y immigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.emigrant >= emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes y emigrant");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, mes y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && immigrant && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.immigrant >= immigrant && 
                      r.emigrant >= emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, immigrante y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.emigrant >= emigrant && 
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && immigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.immigrant >= immigrant &&
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, immigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && immigrant && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.immigrant >= immigrant &&
                      r.emigrant >= emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con mes, immigrante y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && immigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.immigrant >= immigrant &&
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con mes, immigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.emigrant >= emigrant &&
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con mes, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(immigrant && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.immigrant >= immigrant && r.emigrant >= emigrant
                      && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con immigrante, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && Month){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.Month == Month);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y mes");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && immigrant && emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.immigrant >= immigrant && r.emigrant >= emigrant
                      && r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con mes, immigrante, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && immigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.immigrant == immigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y immigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.emigrant == emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.total == total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && immigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.immigrant == immigrant);
                  console.log("Nuevo GET en /residential-variations-stats con mes y immigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.emigrant == emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con mes y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Month && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Month == Month && r.total == total);
                  console.log("Nuevo GET en /residential-variations-stats con mes y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(immigrant && emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.immigrant == immigrant && r.emigrant == emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con immigrante y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(immigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.immigrant == immigrant && r.total == total);
                  console.log("Nuevo GET en /residential-variations-stats con immigrante y emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(emigrant && total){
                  const filtradas = residentialVariationsStats.filter(r => r.emigrant == emigrant && r.total == total);
                  console.log("Nuevo GET en /residential-variations-stats con emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if (Month) {
                  const filtradas = residentialVariationsStats.filter(r => r.Month === parseInt(Month));
                  console.log("Nuevo GET en /residential-variations-stats con mes");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
                  
              } else if(Province){
                  const filtradas = residentialVariationsStats.filter(r => r.Province === Province);
                  console.log("Nuevo GET en /residential-variations-stats con provincia");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(immigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.immigrant == immigrant);
                  console.log("Nuevo GET en /residential-variations-stats con immigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(emigrant){
                  const filtradas = residentialVariationsStats.filter(r => r.emigrant == emigrant);
                  console.log("Nuevo GET en /residential-variations-stats con emigrante");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(total){
                  const filtradas = residentialVariationsStats.filter(r => r.total == total);
                  console.log("Nuevo GET en /residential-variations-stats con total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else {
                  console.log("Nuevo GET en /residential-variations-stats"); 
                  response.status(200);
                  response.json(residentialVariationsStats.map((c)=>{
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
  
  // Paginacion
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

// GET datos, provincia y from y to
app.get(BASE_API_URL+"/residential-variations-stats/:Province", (request, response) => {
  const Province = request.params.Province;
  const from = request.query.from;
  const to = request.query.to;
  db.find({}, (err, residentialVariationsStats)=>{
      if (from && to && !err) {
          if (from > to) {
              response.status(400).json("El rango de meses especificado es inválido");
          } else {
              const datosFiltrados = residentialVariationsStats.filter(x => x.Province === Province && x.Month >= from && x.Month <= to);
              response.status(200).json(datosFiltrados.map((c) =>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /residential-variations-stats/${Province}?from=${from}&to=${to}`);
          }
      }else if(!err){
          const datosFiltrados = residentialVariationsStats.filter(x => x.Province == Province);
          
          if(datosFiltrados.length == 0){
              res.status(404).json('La ruta solicitada no existe');
          }else{
          response.status(200).json(datosFiltrados.map((c)=>{
              delete c._id;
              return c;
          }));
          console.log(`New GET /residential-variations-stats/${Province}`); 
          }
          console.log(`Nuevo GET en /residential-variations-stats/${Province}`); 
      }else{
          response.sendStatus(500);
          console.log("No se ha podido hacer la busqueda");
      }
  });    
});

// GET datos filtrados por provincia y año
app.get(BASE_API_URL+"/residential-variations-stats/:Province/:Month", (request,response) => {
  const Province = request.params.Province;
  const Month = request.params.Month;
  db.find({}, (err, residentialVariationsStats)=>{
      if(!err){
          var filtro = residentialVariationsStats.filter(x => x.Province == Province && x.Month == Month);
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
  console.log("Datos de /residential-variations-stats/:Province/:Month");
});

// POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
app.post(BASE_API_URL + "/residential-variations-stats", (request, response) => {
  const Province = request.body.Province;
  const Month = request.body.Month;
  const immigrant = request.body.immigrant;
  const emigrant = request.body.emigrant;
  const total = request.body.total;

  db.find({},function(err,filteredList){

      if(err){
          response.sendStatus(500);
      }

      // Validar que se envíen todos los campos necesarios
      const requiredFields = ['Province', 'Month', 'immigrant', 'emigrant', 'total'];
      for (const field of requiredFields) {
          if (!request.body.hasOwnProperty(field)) {
          return response.status(400).json(`Missing required field: ${field}`);
          }
      }
      // Verificar que la solicitud se hizo en la ruta correcta
      if (request.originalUrl != BASE_API_URL+"/residential-variations-stats") {
          response.status(405).json('Url no permitida');
      }else{ 

          // Verificar si el recurso ya existe
          //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
          filteredList = filteredList.filter((obj)=>
                          {
                              return(Province == obj.Province && Month == obj.Month && immigrant == obj.immigrant &&
                                  emigrant == obj.emigrant && total == obj.total)
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
  console.log("New POST to /residential-variations-stats"); 
});
  
// POST prohibido -> 405
app.post(BASE_API_URL+"/residential-variations-stats/:Province", (request, response) =>{
  console.log("No se puede hacer este POST /residential-variations-stats/:Province");
  response.sendStatus(405);
});
app.post(BASE_API_URL+"/residential-variations-stats/:Province", (request, response) =>{
  console.log("No se puede hacer este POST /residential-variations-stats/:Province");
  response.sendStatus(405);
});

// PUT a 1 o varias provincias -> 200, sino -> 400
app.put(BASE_API_URL + "/residential-variations-stats/:Province", (request, response) => {
  const provinceId = request.params.Province;
  const body = request.body;

  db.update({ Province: provinceId }, { $set: { Month: body.Month, immigrant: body.immigrant, emigrant: body.emigrant, total: body.total } }, {}, (err, numAffected) => {
      if (err) {
          console.log("Error actualizando el objeto: ", err);
          response.status(500).send("Error actualizando el objeto");
      } else if (numAffected === 0) {
          console.log("No se ha encontrado el objeto con la provincia especificada");
          response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
      } else {
          console.log("Nuevo objeto actualizado en la base de datos");
          response.sendStatus(200);
      }
  });
});

// PUT a 1 o varios años -> 200, sino -> 400

    // Ruta PUT para actualizar un registro de pollutions en NeDB
    app.put(BASE_API_URL + "/residential-variations-stats/:Province/:Month", (request, response) => {
      const provinceId = request.params.Province;
      const monthId = parseInt(request.params.Month);
      const body = request.body;

      // Verifica si los valores de año coinciden
      if (provinceId === body.Province && monthId === body.Month) {
          // Actualiza el registro en la base de datos
          db.update(
              { Province: provinceId, Month: yearId },
              { $set: {
                  immigrant: body.immigrant,
                  emigrant: body.emigrant,
                  total: body.total
              }},
              {},
              function (err, numReplaced) {
                  if (numReplaced === 1) {
                      console.log("Nuevo PUT a /residential-variations-stats/:Province/:Month");
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

  app.put(BASE_API_URL+"/residential-variations-stats", (request,response) =>{
      console.log("No se puede hacer este PUT /residential-variations-stats");
      response.sendStatus(405);
  });

  app.delete(BASE_API_URL+"/residential-variations-stats", (request, response) => {
      db.remove({}, {multi : true},(err, numRemoved)=>{
          if(err){
              console.log("Error para borrar todos los datos");
              response.sendStatus(500);
          }else if(numRemoved == 0){
              response.status(500).send("No hay mas datos para borrar");
              console.log("No se encuentran mas contactos para borrar");
          }else{
              console.log("Borrados todos los datos");
              response.json(200);
              console.log(numRemoved);
          }
      
      });
      console.log("Se ha borrado /residential-variations-stats");
  });

  // DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
  app.delete(BASE_API_URL+"/residential-variations-stats/:Province", (request, response) => {
    const Province = request.params.Province;
    db.remove({Province : Province}, {}, (err, numRemoved)=>{
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
    console.log("Se ha borrado la provincia en /residential-variations-stats/:Province");
});



}