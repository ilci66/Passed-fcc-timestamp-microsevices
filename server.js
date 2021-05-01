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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const objectToShow = {};
// app.get("/api/:date", (request, response) => {
//   const date = request.params.date;

//   if(date.includes('-')){
//     objectToShow['unix'] = new Date(date).getTime();
//     objectToShow['utc'] = new Date(date).toUTCString();
//   } else {
//     objectToShow['unix'] = new Date(parseInt(date)).getTime();
//     objectToShow['utc'] = new Date(parseInt(date)).toUTCString();
//   };
// //if there's an error and these somehow can't be created
//   if(!objectToShow['unix'] || !objectToShow['utc']){
//     response.json({ error : "Invalid Date" })
//   }
//   response.json(objectToShow);
// });

app.get("/api/:date", (request, response) => {
  const date = request.params.date;

  if(date.includes('-')){
    objectToShow['unix'] = new Date(date).getTime();
    objectToShow['utc'] = new Date(date).toUTCString();
  }else if(date.includes(' ')){
    objectToShow['unix'] = new Date(date).getTime();
    objectToShow['utc'] = new Date(date).toUTCString();
  }else{
    objectToShow['unix'] = new Date(parseInt(date)).getTime();
    objectToShow['utc'] = new Date(parseInt(date)).toUTCString();
  };
//if there's an error and these somehow can't be created
  if(!objectToShow['unix'] || !objectToShow['utc']){
    response.json({ error : "Invalid Date" })
  }
  response.json(objectToShow);
});

app.get("/api", (request, response) => {
  objectToShow['unix'] = new Date().getTime();
  objectToShow['utc'] = new Date().toUTCString();

  response.json(objectToShow);
});