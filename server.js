// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api",(req,res)=>{
  console.log("fecha de hoy")
  return res.json({unix:new Date().valueOf(),utc:new Date().toUTCString()});
})

app.get("/api/:date", function (req, res) {

  let entrada = req.params.date

  console.log("Entrada",entrada)

  console.log("Parser",Date.parse(entrada))

  

  
  if(!entrada.includes("-")){
    if(entrada.includes(" ")){
      entrada = Date.parse(entrada)
    }else{
      entrada = parseInt(entrada)  
    } 
  } 
  
  
  
  
  //let fecha_parseada =  
  //let myDate = Date.parse(entrada)
  
  myDate = new Date(entrada)

  

  if(myDate=="Invalid Date"){
    return res.status(400).json({error : "Invalid Date"})
  }else{
    console.log("My date",myDate)
    console.log("fecha usuario")
    return     res.json({unix:myDate.valueOf(),utc:myDate.toUTCString()});
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
