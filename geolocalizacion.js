	var geo = navigator.geolocation;
	var opciones = {};

	function geoError() {
		console.log("no puedo saber donde estas!");
	}

	function geoExito(posicion) {
		var lat = posicion.coords.latitude;
		var lon = posicion.coords.longitude;
		var mapa = new Image();
			mapa.src = "http://maps.googleapis.com/maps/api/staticmap?center="+
						lat + "," + lon +
						"&zoom=13&size=600x300&sensor=false&markers=color:blue";
	}

	// getCurrentPosition recibe 3 parametros. Si sale todo
	// bien se ejecuta geoExito pasando el param 'posicion'

	geo.getCurrentPosition(geoExito, geoError, opciones);
