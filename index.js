var express = require("express");
var cool = require("cool-ascii-faces");
var app = express();
var bodyParser = require("body-parser");

var Datastore = require('nedb');
var db= new Datastore();

var port = process.env.PORT || 3000;


var routeALA = require("./routes/index-ala");

app.use(bodyParser.json());
app.use("/", express.static("./public"));




//Ruta para caras ascii
app.get("/cool", (request, response) => {
    response.send(cool());
    console.log("New request");  
});

//Rutas

    app.use(require('./routes/index-NJO')) ;
    app.use(require('./routes/index-arm')) ;
    
    routeALA(app);


    app.listen(port, () => {
    console.log(`Server ready in  port ${port}`);

});






