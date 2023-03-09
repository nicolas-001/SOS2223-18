var express = require("express");
var cool = require("cool-ascii-faces");
var app = express();
var port = process.env.PORT || 3000


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