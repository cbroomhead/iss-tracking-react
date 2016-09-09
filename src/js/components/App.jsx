var React = require('react');
var axios = require("axios");

var App = React.createClass({
    getInitialState: function (){
      return {
          distance : '?',
          location : '?'
      };  
    },
    _handleClick: function (event){
        event.preventDefault(event);
       this.setState({location : this.refs.userInput.value});
        var self = this;
        setInterval(function() {
            self._getData();
        }, 1000);
    },
    _getData: function (){
        var that = this;
        axios.all([that._getMyLocation(), that._getIssLocation()])
        .then(axios.spread(function (my, iss) {
            var lat1 = that.state.lat1;
            var lon1 = that.state.lon1;
            var lat2 = that.state.lat2;
            var lon2 = that.state.lon2;
            
            that._distanceFormula(lat1, lat2, lon1, lon2);
        
        }));
    },
    _getMyLocation: function(){
        var that = this;
        return axios.post('/mylocation', {
            location : that.refs.userInput.value
        })
        .then(function(response) {
            that.setState({
                lat2: response.data.mycoor.lat2,
                lon2: response.data.mycoor.lon2
            })
        })
        .catch(function(error) {
            console.log(error);
        });
    }, 
    _getIssLocation: function (){
        var ISSurl = 'https://api.wheretheiss.at/v1/satellites/25544';
        var that = this;
        return axios.post('/isslocation', {
            issUrl : ISSurl
        })
        .then(function(response) {
            that.setState({
                lat1: response.data.isscoor.lat1,
                lon1: response.data.isscoor.lon1
            })
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    _distanceFormula: function (lat1, lat2, lon1, lon2){
    var that = this;
        Number.prototype.toRadians = function() {
            return this * Math.PI / 180;
        }
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
    that.setState({
                distance : d
            })
    },
    render: function() {
        return (
          <main>
          <div className="row">
            <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h1>Track the ISS from your city!</h1>
                        <div>
                            <form name="myform"> 
                                <div className="form-group">
                                    <label for="citySubmit">Enter the city where you are right now</label>
                                        <input className="form-control" ref="userInput" type="text" name="mytextfield" />
                                            <button onClick={this._handleClick} type="submit" className="btn btn-primary">Submit</button>
                                </div>    
                            </form>
                            <div>
                                <p> The ISS is {this.state.distance} meters away from {this.state.location}</p>
                            </div>
                        </div>
              </div>
          </div>
          </main>
        );
    }
});

module.exports = App;