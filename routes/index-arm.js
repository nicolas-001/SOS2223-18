const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

    
module.exports = (app) =>{

    var datos = [
          
      {
        year: 2021,
        province: "Almeria",
        month: "Enero",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 0,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Febrero",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 28,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Marzo",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 148,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Abril",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 215,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Mayo",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 207,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Junio",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 320,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Julio",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 329,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Agosto",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 452,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Septiembre",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 470,
        ecomuseum: 0,
        information_point: 0
      },
      {
        year: 2021,
        province: "Almeria",
        month: "Octubre",
        place: "Paraje Natural Karst en Yesos de Sorbas",
        vsitor_center: 533,
        ecomuseum: 0,
        information_point: 0
      }            
                
    ]
            

            

    db.insert(datos);
    console.log("New GET to /data")


//redireccionar

//app.get(BASE_API_URL+'/andalusian-statistical-yearbooks/docs', (req, res) => {
//  res.redirect('');
//});


//ruta api
//GET carga

    app.get(BASE_API_URL+"/andalusian-statistical-yearbooks/loadInitialData", (request,response) => {
        console.log("New GET to /andalusian-statistical-yearbooks");
        db.find({}, (err, andalusianStatisticalYearbooks)=>{
        if(andalusianStatisticalYearbooks.length>0){
            response.json("Los datos andalusian-statistical-yearbooks estan cargados.");
            console.log("Los datos andalusian-statistical-yearbooks estan cargados.")
        }else if(err){
                console.log(`Error geting /andalusian-statistical-yearbooks/loadInitialData: ${err}`);
                response.sendStatus(500);
        }else{
            db.insert(datos)
            console.log(` returned ${andalusianStatisticalYearbooks.length}`);
            response.sendStatus(200);
        }
        });
        
    });
    
    // GET datos y tambien from y to
    app.get(BASE_API_URL+"/andalusian-statistical-yearbooks", (request, response) => {
      const from = request.query.from;
      const to = request.query.to;
      db.find({}, (err, andalusianStatisticalYearbooks)=>{
          if (from && to && !err) {
              const provinciasMes = andalusianStatisticalYearbooks.filter(x => {return x.Month >= from && x.Month <= to}); 
              if (from >= to) {
                  response.status(400).json("El rango de meses especificado es inválido");
              
              }else{
                  response.status(200);
                  response.json(provinciasMes.map((c)=>{
                      delete c._id;
                      return c;
                  }));
                  console.log(`/GET en /andalusian-statistical-yearbooks?from=${from}&to=${to}`); 
              }
          }else if(!err){
              const year = request.query.year
              const province = request.query.province;
              const month = request.query.Month;
              const place = request.query.place;
              const visitor_center = request.query.visitor_center;
              const ecomuseum = request.query.ecomuseum;
              const information_point = request.query.information_point;
              const limit = request.query.limit;
              const offset = request.query.offset;
              
              if(limit && offset){ 
                  const filtradas = pagination(request,andalusianStatisticalYearbooks);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con paginación");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
                  }));
              }else if(Province && Month){
                  const filtradas = andalusianStatisticalYearbooks.filter(r => r.Province == Province && r.Month == MOnth);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y mes");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && month && place && visitor_center && ecomuseum && information_point){
                  const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                      && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, centros de visitantes, ecomuseos y puntos de informacion");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && month && place && visitor_center && ecomuseum){
                  const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, centros de visitantes y ecomuseos");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && month && place && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                  && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.ecomuseum == ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, ecomuseuos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && visitor_center && ecomuseum && information_point){
                  const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.visitor_center >= visitor_center 
                    && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, centros de visitantes, ecomuseos y puntos de informacion");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(province && place && visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place == place && r.visitor_center >= visitor_center 
                  && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar, centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && place && visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar, centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && place && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar, centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && place && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar, centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && place && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && place && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month 
                    && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && place && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                    && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && place && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && visitor_center && ecomuseum && information_point){
                  const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province
                      && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, centros de visitantes, ecomuseos y puntos de informacion");  
                  response.status(200);
                  response.json(filtradas.map((c)=>{
                      delete c._id;
                      return c;
                  }));
              }else if(month && visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(place && visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes y lugar");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month &&
                     r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && place && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && place && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month
                     && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && place && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                    && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(month && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes centros de visitantes, ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(place && visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con lugar, centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
              }else if(province && month && place && visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.place >= place
                    && r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes, lugar, centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && month && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, mes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && place && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place
                     && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, lugar y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && place && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place
                    && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con  mes, lugar y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && visitor_center&& information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(place && visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place
                    && r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con  lugar, centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month
                && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(visitor_center && ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r => r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con centros de visitantes, ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.ecomuseum >= ecomuseum && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con ecomuseos y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(visitor_center && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r => r.visitor_center >= visitor_center && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con centros de visitantes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(place && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes, lugar y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y puntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(visitor_center && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.visitor_center >= visitor_center && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con centros de visitantes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(place && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con lugar y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && ecomuseum){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(place && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con lugar y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province 
                    && r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month && place){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month && r.place >= place);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes y lugar");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && place){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.place >= place);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y lugar");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province && month){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province && r.month == month);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia y mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(province){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.province == province);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con provincia");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(month){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.month == month);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con mes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(place){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.place >= place);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con lugar");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(visitor_center){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.visitor_center >= visitor_center);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con centros de visitantes");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(ecomuseum && information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.ecomuseum >= ecomuseum);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks con ecomuseos");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else if(information_point){
                const filtradas = andalusianStatisticalYearbooks.filter(r =>r.information_point == information_point);
                console.log("Nuevo GET en /andalusian-statistical-yearbooks conpuntos de informacion");  
                response.status(200);
                response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }
              
              
              
              
              else {
                  console.log("Nuevo GET en /andalusian-statistical-yearbooks"); 
                  response.status(200);
                  response.json(andalusianStatisticalYearbooks.map((c)=>{
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
app.get(BASE_API_URL+"/andalusian-statistical-yearbooks/:province", (request, response) => {
  const Province = request.params.province;
  const from = request.query.from;
  const to = request.query.to;
  db.find({}, (err, andalusianStatisticalYearbooks)=>{
      if (from && to && !err) {
          if (from > to) {
              response.status(400).json("El rango de meses especificado es inválido");
          } else {
              const datosFiltrados = andalusianStatisticalYearbooks.filter(x => x.province === province && x.month >= from && x.month <= to);
              response.status(200).json(datosFiltrados.map((c) =>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /andalusian-statistical-yearbooks/${province}?from=${from}&to=${to}`);
          }
      }else if(!err){
          const datosFiltrados = andalusianStatisticalYearbooks.filter(x => x.province == province);
          
          if(datosFiltrados.length == 0){
              res.status(404).json('La ruta solicitada no existe');
          }else{
          response.status(200).json(datosFiltrados.map((c)=>{
              delete c._id;
              return c;
          }));
          console.log(`New GET /andalusian-statistical-yearbooks/${province}`); 
          }
          console.log(`Nuevo GET en /andalusian-statistical-yearbooks/${province}`); 
      }else{
          response.sendStatus(500);
          console.log("No se ha podido hacer la busqueda");
      }
  });    
});

// GET datos filtrados por provincia y mes
app.get(BASE_API_URL+"/https://github.com/adrile15/:province/:month", (request,response) => {
  const Province = request.params.province;
  const Month = request.params.month;
  db.find({}, (err, randalusianStatisticalYearbooks)=>{
      if(!err){
          var filtro = andalusianStatisticalYearbooks.filter(x => x.province == province && x.month == month);
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
  console.log("Datos de /andalusian-statistical-yearbooks/:province/:month");
});

// POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
app.post(BASE_API_URL + "/andalusian-statistical-yearbooks", (request, response) => {
  const province = request.body.province;
  const month = request.body.month;
  const place = request.body.place;
  const visitor_center = request.body.visitor_center;
  const ecomuseum = request.body.ecomuseum;
  const information_point = request.body.information_point;

  db.find({},function(err,filteredList){

      if(err){
          response.sendStatus(500);
      }

      // Validar que se envíen todos los campos necesarios
      const requiredFields = ['province', 'month', 'place', 'visitor_center', 'ecomuseum', 'information_point'];
      for (const field of requiredFields) {
          if (!request.body.hasOwnProperty(field)) {
          return response.status(400).json(`Missing required field: ${field}`);
          }
      }
      // Verificar que la solicitud se hizo en la ruta correcta
      if (request.originalUrl != BASE_API_URL+"/andalusian-statistical-yearbooks") {
          response.status(405).json('Url no permitida');
      }else{ 

          // Verificar si el recurso ya existe
          //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
          filteredList = filteredList.filter((obj)=>
                          {
                              return(Province == obj.province && month == obj.month && place == obj.place &&
                                  visitor_center == obj.visitor_center && ecomuseum == obj.ecomuseum && information_point == obj.inf)
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
  console.log("New POST to /andalusian-statistical-yearbooks"); 
});
  
// POST prohibido -> 405
app.post(BASE_API_URL+"/andalusian-statistical-yearbooks/:province", (request, response) =>{
  console.log("No se puede hacer este POST /andalusian-statistical-yearbooks/:province");
  response.sendStatus(405);
});
app.post(BASE_API_URL+"/andalusian-statistical-yearbooks/:province", (request, response) =>{
  console.log("No se puede hacer este POST /andalusian-statistical-yearbooks/:province");
  response.sendStatus(405);
});

// PUT a 1 o varias provincias -> 200, sino -> 400
app.put(BASE_API_URL + "/andalusian-statistical-yearbooks/:province", (request, response) => {
  const provinceId = request.params.province;
  const body = request.body;

  db.update({ province: provinceId }, { $set: { month: body.month, place: body.place, visitor_center: body.visitor_center, ecomuseum: body.ecomuseum, information_point: body.information_point } }, {}, (err, numAffected) => {
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
    app.put(BASE_API_URL + "/andalusian-statistical-yearbooks/:province/:month", (request, response) => {
      const provinceId = request.params.province;
      const monthId = parseInt(request.params.month);
      const body = request.body;

      // Verifica si los valores de año coinciden
      if (provinceId === body.province && monthId === body.month) {
          // Actualiza el registro en la base de datos
          db.update(
              { province: provinceId, month: yearId },
              { $set: {
                place: body.place,
                visitor_center: body.visitor_center,
                ecomuseum: body.ecomuseum,
                information_point: body.information_point
              }},
              {},
              function (err, numReplaced) {
                  if (numReplaced === 1) {
                      console.log("Nuevo PUT a /https://github.com/antrummor/:province/:month");
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

  app.put(BASE_API_URL+"/andalusian-statistical-yearbooks", (request,response) =>{
      console.log("No se puede hacer este PUT /andalusian-statistical-yearbooks");
      response.sendStatus(405);
  });

  app.delete(BASE_API_URL+"/andalusian-statistical-yearbooks", (request, response) => {
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
      console.log("Se ha borrado /andalusian-statistical-yearbooks");
  });

  // DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
  app.delete(BASE_API_URL+"/andalusian-statistical-yearbooks/:province", (request, response) => {
    const province = request.params.province;
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
    console.log("Se ha borrado la provincia en /andalusian-statistical-yearbooks/:province");
});



}