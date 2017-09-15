// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var qsa = require("./lib/qsa.js");

var year = 1968;
var delay;

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
    shape.setAttribute("class", `cls-1 ${className}`);
  })
};

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

var tooltip = document.querySelector(".tooltip");
var shapes = qsa(".cls-1");
var map = document.querySelector(".map");

shapes.forEach(function(s) {
  var label = s.id.replace("_", " ");
  s.addEventListener("mouseover", function() {
    tooltip.innerHTML = label + " County";
    tooltip.classList.add("show");
  })
})

map.addEventListener("mouseout", function() {
  tooltip.classList.remove("show");
});

document.querySelector("svg").addEventListener("mousemove", function(event) {
  var bounds = map.getBoundingClientRect();
  var x = event.clientX - bounds.left;
  var y = event.clientY - bounds.top;
  if (x > bounds.width / 2) {
    x -= tooltip.offsetWidth + 10;
  } else {
    x += 10;
  }
  tooltip.style.left = x+ "px";
  tooltip.style.top = y + "px";
})
