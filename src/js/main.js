// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("./presidential_votes_by_county.geo.json");

var mapElement = document.querySelector("leaflet-map");
var L = mapElement.leaflet;
var map = mapElement.map;

map.scrollWheelZoom.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.boxZoom.disable();
map.removeControl(map.zoomControl);
map.dragging.disable();

var year = 1988;
var delay;

function getColor(p, m) {
  if (p == "D") {
    return '#045a8d';
    // return m >= .7 ? '#045a8d' :
    //    m >= .6 ? '#2b8cbe' :
    //    m >= .5 ? '#74a9cf' :
    //    m >= .4 ? '#a6bddb' :
    //    '#d0d1e6';
  } else if (p == "R") {
    return '#b30000';
    // return m >= .7 ? '#b30000' :
    //    m >= .6 ? '#e34a33' :
    //    m >= .5 ? '#fc8d59' :
    //    m >= .4 ? '#fdbb84' :
    //    '#fdd49e';
  }
  //   if (p == "D") {
  //          return m >= .55 ? '#2b8cbe' :
  //      m >= .5 ? '#74a9cf' :
  //      '#bdc9e1' ;
  // } else if (p == "R") {
  //   return m >= .55 ? '#e34a33' :
  //      m >= .5 ? '#fc8d59' :
  //      '#fdcc8a' ;
  // } else if (p == "T") {
  //   return "white";
  // }

};

function style(feature) {
  var party = feature.properties[year + "_Party"];
  var color;
  if (party == "T") {
    color = "#666";
  } else {
    var margin = feature.properties[year + "_" + party];
    color = getColor(party, margin);
  }
  return {
    fillColor: color,
    weight: 0.5,
    opacity: 1,
    color: 'white',
    fillOpacity: 1
  };
}

var geojson = L.geoJson(data, {
  style: style
}).addTo(map);

map.fitBounds(geojson.getBounds());

var animate = function() {
  if (year == 2008) {
    delay = 3000;
  } else {
    delay = 1500;
  }
  if (year == 2012) {
    year = 1988;
  } else {
    year += 4;
  }

  geojson.setStyle(style)

  document.querySelector(".year").innerHTML = year;
  setTimeout(animate, delay);
};

setTimeout(animate, 1500);
