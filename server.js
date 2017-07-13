//llama e iniciaiza express
var express = require('express');
var app = express();

//conecta la liga estatica de la data
app.use("/data", express.static(__dirname + '/data'));

//conecta la liga estatica de assets
app.use("/assets", express.static(__dirname + '/assets'));

//conecta a liga estatica de node-modules
app.use("/static", express.static(__dirname + '/node_modules'));

//levanta el servidor y envia como respuesta el index.html
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});

app.listen(1506);
