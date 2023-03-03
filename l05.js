//import * as myModule from '/node_modules/index-njo/index-NJO.js';
//import { calcularMediaPorPosicion } from './index-NJO.js';
//import { media } from './index-NJO.js';
var express = require("express");
var cool = require("cool-ascii-faces"); 
var app = express();
var media = require("index-njo");
var port = 12345
app.get("/faces", (request,response) => {
    response.send(cool());
    console.log("New Request")
});
app.get("/brr", (request,response) => {
    response.send(media());
    console.log("New Request")
});
app.get("/aaa", (request,response) => {
    response.send(cool());
    console.log("New Request")
});

app.listen(port,()=> {
    console.log("Server ready in port 12345");
});
