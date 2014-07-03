
//Geolocation html5
function showpunto(x1, y1) {
    logp("Ubica el punto:" + x1 + ", " + y1);
    miubicacion.removeAllFeatures();
    miubicacion.addFeatures([
        new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(x1, y1), {}, {
            externalGraphic: 'images/ic_ubic-web.png', graphicHeight: 24, graphicWidth: 24,
        })]);
    logp("Centra el punto");
    map.zoomToExtent(miubicacion.getDataExtent());
   $.mobile.changePage("#manpage");
}

function showLocation(position) {

    logp("Limpiar Geolocation");
    navigator.geolocation.clearWatch(watchID);

    logp("Transforma EPSG:4326 a Spherical Mercator Projetion");
    var lonLat = new OpenLayers.LonLat(position.coords.longitude,
            position.coords.latitude).transform(
            new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
            map.getProjectionObject() //to Spherical Mercator Projection
            );
    showpunto(lonLat.lon, lonLat.lat);
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function getLocationUpdate() {
    //alert('inicia');
    logp("Watch Position");
    watchID = navigator.geolocation.watchPosition(showLocation, onError, {timeout: 31000, enableHighAccuracy: true});
    //alert('enviado');
}
//Geolocation html5