function obtenerGeoInformacion(lat, lon) {
	var _baseUrl = 'http://query.yahooapis.com/v1/public/yql?';
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+
		lat +', ' + lon + '" AND gflags= "R"';

	//como es una query string que va por url, no debe tener espacios:
	query = encodeURIComponent(query);

	$.ajax({
		url: _baseUrl + 'q=' + query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data: {
			format: 'json'
		}
	});
}

function obtenerClima(woeid) {
	var _baseUrl = 'http://query.yahooapis.com/v1/public/yql?';
	var query = 'SELECT * FROM weather.forecast WHERE woeid ="'+ woeid +'" AND u="c"';

	//como es una query string que va por url, no debe tener espacios:
	query = encodeURIComponent(query);

	$.ajax({
		url: _baseUrl + 'q=' + query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format: 'json'
		}
	});
}

function procesarClima(datos) {
	var clima = datos.query.results.channel,
		temp = clima.item.condition.temp,
		unit = clima.units.temperature,
		code = clima.item.condition.code,
		//img = new Image();
		src = "http://l.yimg.com/a/i/us/we/52/"+ code +".gif";

	$('#clima')
		.append(
			'<h3>Clima</h3>'+
			'<p>Temperatura: '+ temp +' '+ unit+'°  '+ '<img src="'+src+'"/>'+
			'</p>'
		);
}

function procesarGeoInfo(datos) {
	var resultado = datos.query.results.Result,
		barrio = resultado.neighborhood,
		cuidad = resultado.city,
	 	pais = resultado.country,
	 	calle = resultado.street,
	 	altura = resultado.house,
	 	woeid = resultado.woeid; //clima

	$('#geo')
		.prepend(
			'<h3>Datos aproximados</h3>'+
			'<p>País: '+ pais +'</p>'+
			'<p>Cuidad: '+ cuidad +'</p>' +
			'<p>Calle: '+ calle +'</p>' +
			'<p>Altura: ' + altura + '</p>'
		);

	obtenerClima(woeid);
}

