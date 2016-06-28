var map = L.map('map', {
  pin: false,
  pinControl: true,
  guideLayers: [L.polyline([[51, 0], [51, 1]])]
});

var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

map.setView(new L.LatLng(51.3, 0.7),8);
map.addLayer(osm);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    polyline: {},
    polygon: {},
    marker: {
      distance: 250
    },
    rectangle: false,
    circle: false
  },
  edit: {
    featureGroup: drawnItems
  }
});

L.geoJson(loadJson(), {
  onEachFeature: function (feature, layer) {
    if(feature.geometry.type == "LineString") {
      layer.setStyle({
        color: 'purple',
        weight: 5
      });
    } else if (feature.geometry.type == "Polygon") {
      drawnItems.addLayer(layer);
    }
  }
});


map.addControl(drawControl);

map.on('draw:created', function (e) {
  var layer = e.layer;
  drawnItems.addLayer(layer);

});


map.on('mousemove', function (e) {
  //console.log(e.latlng);
});
