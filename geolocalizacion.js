document.addEventListener('DOMContentLoaded', function() {
	var geo = navigator.geolocation;
	var opciones = {};

	document.getElementsByTagName('a')[0].addEventListener('click', function() {

		function geoError() {
			alert("no puedo saber donde estas!");
		}

		function geoExito(posicion) {
			var lat = posicion.coords.latitude;
			var lon = posicion.coords.longitude;
			var mapa = new Image();
				mapa.src = "http://maps.googleapis.com/maps/api/staticmap?center="+
							lat + "," + lon +
							"&zoom=15&size=600x300&sensor=false";

			document.getElementById('geo').appendChild(mapa);

			obtenerGeoInformacion(lat,lon);
		}

		// getCurrentPosition recibe 3 parametros. Si sale todo
		// bien se ejecuta geoExito pasando el param 'posicion'

		geo.getCurrentPosition(geoExito, geoError, opciones);
		this.style.display = "none";
	});
});