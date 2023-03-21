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
              }else if(Province && emigrante && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.emigrante >= emigrante && 
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, emigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(Province && immigrante && total){
                  const filtradas = residentialVariationsStats.filter(r => r.Province == Province && r.immigrante >= immigrante &&
                      r.total >= total);
                  console.log("Nuevo GET en /residential-variations-stats con provincia, immigrante y total");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && NO2 && O3){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.NO2 >= NO2 &&
                      r.O3 >= O3);
                  console.log("Nuevo GET en /residential-variations-stats con año, NO2 y O3");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && NO2 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.NO2 >= NO2 &&
                      r.SO2 >= SO2);
                  console.log("Nuevo GET en /residential-variations-stats con año, NO2 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && O3 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.O3 >= O3 &&
                      r.SO2 >= SO2);
                  console.log("Nuevo GET en /residential-variations-stats con año, O3 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(NO2 && O3 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.NO2 >= NO2 && r.O3 >= O3
                      && r.SO2 >= SO2);
                  console.log("Nuevo GET en /residential-variations-stats con NO2, O3 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && year){
                  const filtradas = residentialVariationsStats.filter(r => r.province == province && r.year == year);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y año");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && NO2 && O3 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.NO2 >= NO2 && r.O3 >= O3
                      && r.SO2 >= SO2);
                  console.log("Nuevo GET en /residential-variations-stats con año, NO2, O3 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && NO2){
                  const filtradas = residentialVariationsStats.filter(r => r.province == province && r.NO2 == NO2);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y NO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && O3){
                  const filtradas = residentialVariationsStats.filter(r => r.province == province && r.O3 == O3);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y O3");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.province == province && r.SO2 == SO2);
                  console.log("Nuevo GET en /residential-variations-stats con provincia y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && NO2){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.NO2 == NO2);
                  console.log("Nuevo GET en /residential-variations-stats con año y NO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && O3){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.O3 == O3);
                  console.log("Nuevo GET en /residential-variations-stats con año y O3");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(year && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.year == year && r.SO2 == SO2);
                  console.log("Nuevo GET en /residential-variations-stats con año y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(NO2 && O3){
                  const filtradas = residentialVariationsStats.filter(r => r.NO2 == NO2 && r.O3 == O3);
                  console.log("Nuevo GET en /residential-variations-stats con NO2 y O3");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(NO2 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.NO2 == NO2 && r.SO2 == SO2);
                  console.log("Nuevo GET en /residential-variations-stats con NO2 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(O3 && SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.O3 == O3 && r.SO2 == SO2);
                  console.log("Nuevo GET en /residential-variations-stats con O3 y SO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if (year) {
                  const filtradas = residentialVariationsStats.filter(r => r.year === parseInt(year));
                  console.log("Nuevo GET en /residential-variations-stats con año");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
                  
              } else if(province){
                  const filtradas = residentialVariationsStats.filter(r => r.province === province);
                  console.log("Nuevo GET en /residential-variations-stats con provincia");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(NO2){
                  const filtradas = residentialVariationsStats.filter(r => r.NO2 == NO2);
                  console.log("Nuevo GET en /residential-variations-stats con NO2");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(O3){
                  const filtradas = residentialVariationsStats.filter(r => r.O3 == O3);
                  console.log("Nuevo GET en /residential-variations-stats con O3");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(SO2){
                  const filtradas = residentialVariationsStats.filter(r => r.SO2 == SO2);
                  console.log("Nuevo GET en /residential-variations-stats con SO2");  
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
  
  
  

  ////////////////////////////////////////////////////////////////////////////////////
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
    alaAPI = variations;
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