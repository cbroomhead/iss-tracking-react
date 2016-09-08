var React = require('react');
var axios = require("axios");

var App = React.createClass({
    _handleClick: function (event){
        event.preventDefault();
        var that = this;
        axios.post('/location', {
            location : that.refs.userInput.value
        })
        .then(function(response) {
            console.log("HOPEFULLY THIS IS THEOBJECT", response);
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    // _distanceFormula: function (){
     //var R = 6371e3; // metres
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
    // },
    render: function() {
        return (
          <main>
            <h1>This is the ISS tracking application</h1>
            <hr/>
                <div>
                    <form name="myform" className="input-group"> 
                        <input ref="userInput" className="form-control input-lg" type="text" name="mytextfield" />
                            <span className="input-group-btn">
                                <button onClick={this._handleClick} className="btn btn-lg btn-danger">  
                                    Submit
                                </button>
                            </span>
                    </form>
                </div>
          </main>
        );
    }
});

module.exports = App;