//super strick js
'use strict';

var geocoder = require('geocoder');

module.exports = function(sequelize, DataTypes) {
  var place = sequelize.define('place', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
//before create do this string else find latitude and longitude 
hooks: {
      beforeCreate: function(place, options, cb) {
        geocoder.geocode(place.address, function(err, data) {
          if (err) return cb(err, null);
          place.lat = data.results[0].geometry.location.lat;
          place.lng = data.results[0].geometry.location.lng;
          cb(null, place);
        });
      }
    }
  });
  return place;
};
