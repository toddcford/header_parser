// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
app.use(express.json());    
app.use(express.urlencoded()); 
require('dotenv').config()
const fetch = require("isomorphic-fetch")
const dns = require("dns")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

function text(url) {
  return fetch(url).then(res => res.text())
}


text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  let ip_c = data.match(ipRegex)[0];
  console.log(ip_c);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", (req, res) => {
  console.log(req.headers)
  
  const ip = req.header('x-forwarded-for') || req.socket.remoteAddress
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent']
  
  res.json({"ipaddress": ip, "language": language, "software": software})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
