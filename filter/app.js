/* Initial Map */
var map = L.map('map').setView([-2.367064,118.872815],5); //lat, long, zoom
      
/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);

/* Icon Category */
var sizeicon= 24,
_iconsize = [sizeicon, sizeicon],
_iconsizehalf = sizeicon / 2,
_iconanchor = [_iconsizehalf, sizeicon],
_iconsizeminus = -1 * sizeicon,
_popupanchor = [0, _iconsizeminus];

var iconSd = L.icon({
  iconUrl: "../assets/marker/redicon.png",
  iconSize: _iconsize,
  iconAnchor: _iconanchor,
  popupAnchor: _popupanchor,
});

var iconSmp = L.icon({
  iconUrl: "../assets/marker/greenicon.png",
  iconSize: _iconsize,
  iconAnchor: _iconanchor,
  popupAnchor: _popupanchor,
});

var iconSma = L.icon({
  iconUrl: "../assets/marker/purpleicon.png",
  iconSize: _iconsize,
  iconAnchor: _iconanchor,
  popupAnchor: _popupanchor,
});

var _oneachfeature = function (feature, layer) {
  if (feature.properties) {
    layer.on({
      click: function (e) {
        layer.bindPopup(feature.properties.label);
        map.flyTo(new L.LatLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0]), 15);
        layer.openPopup();
      }
    });
  }
};

/* GeoJSON Point SD */
var pointSd = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: iconSd
    });
  },
  /* Popup */
  onEachFeature: _oneachfeature,
  /* Filter */
  filter: function(feature, layer) {
    return (feature.properties.kategori == "SD");
  }
});

/* GeoJSON Point SMP/MTS */
var pointSmp = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: iconSmp
    });
  },
  /* Popup */
  onEachFeature: _oneachfeature,
  /* Filter */
  filter: function(feature, layer) {
    return (feature.properties.kategori == "SMP/MTS");
  }
});

/* GeoJSON Point SMA/SMK/MA */
var pointSma = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: iconSma
    });
  },
  /* Popup */
  onEachFeature: _oneachfeature,
  /* Filter */
  filter: function(feature, layer) {
    return (feature.properties.kategori == "SMA/SMK/MA");
  }
});

$.getJSON("../data/school.geojson", function (data) {
  pointSd.addData(data);
  pointSmp.addData(data);
  pointSma.addData(data);
  map.addLayer(pointSd);
  map.addLayer(pointSmp);
  map.addLayer(pointSma);
  map.fitBounds(pointSd.getBounds());
});

/* Control Layer */
var Layers = {
  '<img src="../assets/marker/redicon.png" width="12"> Primary School': pointSd,
  '<img src="../assets/marker/greenicon.png" width="12"> Junior High School': pointSmp,
  '<img src="../assets/marker/purpleicon.png" width="12"> Senior High School': pointSma,
}
var layerControl = L.control.layers(null, Layers, {collapsed:false});
layerControl.addTo(map);