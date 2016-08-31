// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
// require("component-leaflet-map");
// var savage = require("savage-query");

// var data = require("./presidential_vote_by_county.geo.json");

// var mapElement = document.querySelector("leaflet-map");
// var L = mapElement.leaflet;
// var map = mapElement.map;

// map.scrollWheelZoom.disable();
// map.touchZoom.disable();
// map.doubleClickZoom.disable();
// map.boxZoom.disable();
// map.removeControl(map.zoomControl);
// map.dragging.disable();

var year = 1968;
var delay;

// function getColor(p, m) {
//   if (p == "D") {
//     // return '#045a8d';
//     return m >= .7 ? '#045a8d' :
//        m >= .6 ? '#2b8cbe' :
//        m >= .5 ? '#74a9cf' :
//        m >= .4 ? '#a6bddb' :
//        '#d0d1e6';
//   } else if (p == "R") {
//     // return '#b30000';
//     return m >= .7 ? '#b30000' :
//        m >= .6 ? '#e34a33' :
//        m >= .5 ? '#fc8d59' :
//        m >= .4 ? '#fdbb84' :
//        '#fdd49e';
//   }
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

// };

var colorMap = function() {
  countyData.forEach(function(row) {
    var party = row[year + "_Party"];
    // var color;
    if (party == "T") {
      // color = "#AAA";
    } else {
      var margin = row[year + "_" + party];
      // color = getColor(party, margin);
    }
    var county = row.County;
    county = county.replace(" ", "_");
    var shape = document.querySelector("#" + county);

    var className = getClassName(party, margin);
    // classes.forEach(function(class) {
    //   savage(shape).removeClass(class);
    // });
    // savage(shape).addClass(className);
    shape.setAttribute("class", `cls-1 ${className}`);
  })
};

// function style(feature) {
//   var party = feature.properties[year + "_Party"];
//   var color;
//   if (party == "T") {
//     color = "#AAA";
//   } else {
//     var margin = feature.properties[year + "_" + party];
//     color = getColor(party, margin);
//   }
//   return {
//     fillColor: color,
//     weight: 0.5,
//     opacity: 1,
//     color: 'white',
//     fillOpacity: 1
//   };
// }

// var geojson = L.geoJson(data, {
//   style: style
// }).addTo(map);

// map.fitBounds(geojson.getBounds());

var animate = function() {
  if (year == 2008) {
    delay = 3000;
  } else {
    delay = 1500;
  }
  if (year == 2012) {
    year = 1968;
  } else {
    year += 4;
  }

  colorMap();
  // geojson.setStyle(style)

  document.querySelector(".year").innerHTML = year;
  setTimeout(animate, delay);
};

animate();

function getClassName(p, m) {
  if (p == "D") {
    // return '#045a8d';
    return m >= .7 ? 'firstD' :
       m >= .6 ? 'secondD' :
       m >= .5 ? 'thirdD' :
       m >= .4 ? 'fourthD' :
       'fifthD';
  } else if (p == "R") {
    // return '#b30000';
    return m >= .7 ? 'firstR' :
       m >= .6 ? 'secondR' :
       m >= .5 ? 'thirdR' :
       m >= .4 ? 'fourthR' :
       'fifthR';
  } else if (p == "T") {
    return 'tie';
  }
};


