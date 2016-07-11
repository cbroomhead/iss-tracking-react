//##Augmenting our application
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }

var request = require('request');
var prompt = require('prompt');
//var cityLocation;

function distanceFormula (lat1, lat2, lon1, lon2, city){
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    
    console.log(city+ " is " + d.toFixed(2) + " from the ISS" );
}


prompt.get('location', function (err, city){
  if(err){
    console.log('there was an error');
    }
else {
    var myUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city.location;
    cityLocation = city.location;
    request(myUrl, function(err, res){
        var lat2 = JSON.parse(res.body).results[0].geometry.location.lat;
 
        //console.log(lat2);
        var lon2 = JSON.parse(res.body).results[0].geometry.location.lng;

        //console.log(lon2);
    var ISSurl = 'https://api.wheretheiss.at/v1/satellites/25544';
    request(ISSurl, function(err, position) {
        if (err) {
            console.log('there was an error');
        }
        else {
            var lat1= (JSON.parse(position.body).latitude);

           // console.log(lat1);
            var lon1= (JSON.parse(position.body).longitude);

           // console.log(lon1);
           
            distanceFormula(lat1, lon1, lat2, lon2, city.location);
            
       }
    });
               
    })
}
});

/*
function distanceFormula () {



}    
*/