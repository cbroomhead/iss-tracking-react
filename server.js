//REQUIRES
var request = require('request');
var prompt = require('prompt');
var express = require('express');
var app = express();
var axios = require('axios');
var bodyParser = require('body-parser');


//MIDDLEWARE
app.use('/files', express.static(__dirname + '/src'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


//ROUTES
app.post('/mylocation', function(req, res) {
    var city = req.body;
    var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city.location;
    request(apiUrl, function(err, info){
        if (err){
            console.log(err);
        }
        else {
            console.log(info.body);
            var lat2 = JSON.parse(info.body).results[0].geometry.location.lat;
            var lon2 = JSON.parse(info.body).results[0].geometry.location.lng;
            var ISSurl = 'https://api.wheretheiss.at/v1/satellites/25544';
            res.send({ msg: 'ok', desc: 'here is the user defined position', mycoor : {lat2: lat2, lon2: lon2}});
        }
    })
});

app.post('/isslocation', function(req, res) {
            request(req.body.issUrl, function(err, position) {
                if (err) {
                    console.log('there was an error');
                }
                else {
                    var lat1= (JSON.parse(position.body).latitude);
                    var lon1= (JSON.parse(position.body).longitude);
                    res.send({ msg: 'ok', desc: 'here is the ISS position', isscoor : {lat1: lat1, lon1: lon1}});
                }
            });
});


//BOILERPLATE
app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/src/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

