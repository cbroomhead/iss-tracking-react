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


//##Augmenting our application
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }


//var cityLocation;

// function distanceFormula (lat1, lat2, lon1, lon2, city){
//     var R = 6371e3; // metres
//     var φ1 = lat1.toRadians();
//     var φ2 = lat2.toRadians();
//     var Δφ = (lat2-lat1).toRadians();
//     var Δλ = (lon2-lon1).toRadians();

//     var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     var d = R * c;
    
//     console.log(city+ " is " + d.toFixed(2) + " from the ISS" );
// }



app.post('/mylocation', function(req, res) {
    var city = req.body;
    var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city.location;
    request(apiUrl, function(err, info){
        if (err){
            console.log(err);
        }
        else {
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



// prompt.get('location', function (err, city){
//   if(err){
//     console.log('there was an error');
//     }
// else {
//     console.log(city)
//     var myUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city.location;
//     cityLocation = city.location;
//     request(myUrl, function(err, res){
//         var lat2 = JSON.parse(res.body).results[0].geometry.location.lat;
 
//         //console.log(lat2);
//         var lon2 = JSON.parse(res.body).results[0].geometry.location.lng;

//         //console.log(lon2);
//     var ISSurl = 'https://api.wheretheiss.at/v1/satellites/25544';
//     request(ISSurl, function(err, position) {
//         if (err) {
//             console.log('there was an error');
//         }
//         else {
//             var lat1= (JSON.parse(position.body).latitude);

//           // console.log(lat1);
//             var lon1= (JSON.parse(position.body).longitude);

//           // console.log(lon1);
           
//             distanceFormula(lat1, lon1, lat2, lon2, city.location);
            
//       }
//     });
               
//     })
// }
// });


//BOILERPLATE
app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/src/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

