//##Augmenting our application

var request = require('request');
var prompt = require('prompt');



prompt.get('location', function (err, city){
  if(err){
    console.log('there was an error');
    }
else {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city.location;
    request(url, function(err, res){
            var data = JSON.parse(res.body).results[0].geometry.location;
            console.log(data)
             //console.log("the address of" +  + data.lat + " " + data.lng);
    })
   
}
});


/*
fs.readFile('./letter.txt', function(err, content) {
    if (err) {
        console.log('there was an error');
    }
    else {
        console.log(content.toString());
    }
});
*/