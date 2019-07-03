const express = require('express'),
	app = express(),
	mysql = require('mysql'),
	ppuerto = process.env.PORT || 80,
	ejs = require('ejs'),
	fs = require('fs');

var diosesJSON = JSON.parse(fs.readFileSync(__dirname + '/dioses.json', 'utf8'));
//var diosesJSON = [{"oculto":"0","id":"3","recuperacion":"SPAN","espanol":"Poseid\u00f3n","griego":"\u03a0\u03bf\u03c3\u03b5\u03b9\u03b4\u03bf\u03bd","transliteracion":"poseidon","aspectohistorico":"\u00c9ste tuvo parte en una disputa con Atenea por ser el protector de la ciudad de Atenas (sin nombre a\u00fan), en la contienda cada uno ofreci\u00f3 un don a la ciudad como regalo a los ciudadanos.","aspectoestructural":"La primera idea conservada del nombre, escrito en lineal B, es Po-se-da-o o Po-se-da-wae-ne, que corresponden a Poseida\u014dn y Poseidawonos en griego mic\u00e9nico; en griego hom\u00e9rico aparece como \u03a0\u03bf\u03c3\u03b5\u03b9\u03b4\u03ac\u03c9\u03bd (Poseida\u014dn); en e\u00f3lico como \u03a0\u03bf\u03c4\u03b5\u03b9\u03b4\u03ac\u03c9\u03bd (Poteida\u014dn); y en d\u00f3rico como \u03a0\u03bf\u03c4\u03b5\u03b9\u03b4\u03ac\u03bd (Poteidan), \u03a0\u03bf\u03c4\u03b5\u03b9\u03b4\u03ac\u03c9\u03bd (Poteida\u014dn) y \u03a0\u03bf\u03c4\u03b5\u03b9\u03b4\u1fb6\u03c2 (Poteidas)","aspectoevolutivo":"El nombre del dios marino etrusco Nethuns fue adoptado en lat\u00edn para Neptuno (Neptunus) en la mitolog\u00eda romana, siendo ambos dioses del mar an\u00e1logos a Poseid\u00f3n.","significado":"Dios de los mares y los oc\u00e9anos, es el regente de las aguas y creador de terremotos.","imagen":"https%3A%2F%2Ffilosofiapresocraticablog.files.wordpress.com%2F2016%2F03%2Fposeidon.jpg%3Fw%3D431%26h%3D530","equipo":"2","grupo":"603"}, {"oculto":"1","id":"5","recuperacion":"YWIT","espanol":"Eolo","griego":"\u0391?\u03bf\u03bb\u03bf\u03c2","transliteracion":"Dios Eolo","aspectohistorico":"YWIT","aspectoestructural":"YWIT","aspectoevolutivo":"YWIT","significado":"El borracho bondadoso, rancher\u00f3n y que polea con\u2026 bueno, ac\u00e1 una peque\u00f1a transcripci\u00f3n de sus sabias palabras: \"S\u00ed, y ni la c\u00e1mara me puede apagar ire\/ No, les puedo muestear.\/ Yo poleo con la gente que es mala, no con la gente que es buena.\/ Ust\u00e9? Ust\u00e9 es buena persona. Tambi\u00e9n \u00e9l, tambi\u00e9n ella, la ni\u00f1a\u201d. En una pelea\u2026 quisiera estar a su lado poleando.","imagen":"https%3A%2F%2Fi.imgur.com%2FT8Eh7Dh.png","equipo":"yo poleo","grupo":"777"}, {"oculto":"1","id":"7","recuperacion":"LWMB","espanol":"Canaca","griego":"\u039a\u03b1\u03bd\u03b1\u03ba\u03b1","transliteracion":"LWMB","aspectohistorico":"LWMB","aspectoestructural":"LWMB","aspectoevolutivo":"LWMB","significado":"LWMB","imagen":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/2\/2b\/Guillermo_L%C3%B3pez_Langarica.png","equipo":"1","grupo":"600"}, {"oculto":"1","id":"8","recuperacion":"JZGB","espanol":"Eduardo Cano","griego":"\u0395\u03b4\u03c5\u03b1\u03c1\u03b4\u03bf \u039a\u03b1\u03bd\u03bf","transliteracion":"Eduardo Cano","aspectohistorico":"Es el Dios todo poderoso","aspectoestructural":"El nombre se conserva de igual manera, aunque es com\u00fan decirlo solo en Espa\u00f1ol ","aspectoevolutivo":"El nombre fue acortado de \"Dios todo poderoso\" a tan solo Dios ","significado":"Todo poderoso","imagen":"https:\/\/i.imgur.com\/k4SFDgR.jpg","equipo":"000","grupo":"0"}, {"oculto":"1","id":"9","recuperacion":"RPKS","espanol":"Carvajal","griego":"\u039a\u03b1\u03c1\u03b2\u03b1\u03b3\u03b1\u03bb","transliteracion":"Flojera\/Pereza\/Mandil\/M E N T I R O S O","aspectohistorico":"Es uno de los Dioses mas antiguos de todos.\r\nSe dice que \u00e9l es el culpable de muchas cosas que no se completaron en su momemnto","aspectoestructural":"El nombre se conserva de igual manera","aspectoevolutivo":"Solo fue traducido a una palabra mundial (Carvajal)","significado":"Flojera\/Buf\u00f3n\/Pereza\/Mandil","imagen":"https:\/\/i.imgur.com\/fR7RuWA.jpg","equipo":"000","grupo":"0"}, {"oculto":"1","id":"10","recuperacion":"SJRN","espanol":"Michell","griego":"\u039c\u03b9\u03c7\u03b5\u03bb\u03bb","transliteracion":"Michell","aspectohistorico":"Es una de las Diosas mas antiguas de todas.\r\nSe dice que era la encargada de hacer la felicidad con fiestas.\r\nCreo a los que conocemos como Bufones o Payasos","aspectoestructural":"El nombre solo se tradujo al espa\u00f1ol","aspectoevolutivo":"Solo fue traducido ","significado":"Diverci\u00f3n","imagen":"https:\/\/i.imgur.com\/PAqp7Sx.jpg","equipo":"000","grupo":"0"}, {"oculto":"1","id":"11","recuperacion":"THUK","espanol":"Judith","griego":"\u03a7\u03c5\u03b4\u03b9\u03c4","transliteracion":"Judith","aspectohistorico":"Es una de las Diosas mas antiguas de todas, se dice que daba la fuerza necesaria para realizar las labores encomendadas (Responsabilidad)","aspectoestructural":"Su nombre fue reducido a Ju (\u03a7\u03c5)","aspectoevolutivo":"Su nombre fue reducido a Ju (\u03a7\u03c5)","significado":"Responsable","imagen":"https%3A%2F%2Fi.imgur.com%2F64Uloxv.jpg","equipo":"000","grupo":"0"}, {"oculto":"0","id":"16","recuperacion":"RKTH","espanol":"Deimos","griego":"\u0394\u03b5\u03b9\u03bc\u03bf\u03c2","transliteracion":"Deimos","aspectohistorico":"Deimos y otros terribles d\u00e9mones acompa\u00f1aron a la erinia Tis\u00edfone en su af\u00e1n de                volver loco a Atamante, el marido de Ino.","aspectoestructural":"Deimos tanto en griego como en su transliteraci\u00f3n, es el satelite mas peque\u00f1o y alejado de Marte","aspectoevolutivo":"Para mencionar a Deimos tenemos que mencionar a Phobos, su hermano, pues su nombre significa Fobia, y as\u00ed da sentido a su hermano Deimos, como miedo","significado":"Dolor o pena","imagen":"https:\/\/hablemosdemitologias.com\/wp-content\/uploads\/2018\/05\/deimos.jpg","equipo":"5","grupo":"603"}, {"oculto":"0","id":"17","recuperacion":"HLYI","espanol":"Perseo","griego":"\u03a0\u03b5\u03c1\u03c3\u03b5\u03cd\u03c2","transliteracion":"Perseus","aspectohistorico":"Perseo fue quien decapito a medusa para as\u00ed derrotar al Kraken","aspectoestructural":"Pas\u00f3 del griego Perseis al lat\u00edn Perseus luego al espa\u00f1ol Perseo","aspectoevolutivo":"Tanto en griego como en lat\u00edn y espa\u00f1ol se conserva la ra\u00edz Per","significado":"Sucesi\u00f3n de Zeus","imagen":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/9\/9c\/Perseo_Perseus_%CE%A0%CE%B5%CF%81%CF%83%CE%B5%CE%B1%CF%82.jpg\/800px-Perseo_Perseus_%CE%A0%CE%B5%CF%81%CF%83%CE%B5%CE%B1%CF%82.jpg","equipo":"5","grupo":"603"}, {"oculto":"0","id":"18","recuperacion":"YSNZ","espanol":"Thanos","griego":"\u0398\u03ac\u03bd\u03b1\u03c4\u03bf\u03c2","transliteracion":"Thanatos","aspectohistorico":"Homero y Hes\u00edodo le hac\u00edan hiko de Nix, Noche, y gemelo de Hipnos","aspectoestructural":"Su ra\u00edz es Thanat \"Muerte\" y su flexi\u00f3n os \"La\". La muerte","aspectoevolutivo":"Se elimin\u00f3 \"at\" en Thanatos para quedar en Thanos","significado":"Muerte sin violencia","imagen":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/2\/20\/Eros_Thanatos_Musei_Capitolini_MC1092.jpg\/800px-Eros_Thanatos_Musei_Capitolini_MC1092.jpg","equipo":"5","grupo":"603"}, {"oculto":"0","id":"22","recuperacion":"RPJM","espanol":"Zeus","griego":"\u0394\u03b9\u03cc\u03c2","transliteracion":"Dios","aspectohistorico":"Su equivalente en la mitolog\u00eda romana era J\u00fapiter, en la etrusca, Tinia, en la egipcia, Am\u00f3n y en la cananea, Baal.","aspectoestructural":"En griego el nombre del dios es Ze\u00fas en el caso nominativo y \u0394\u03b9\u03cc\u03c2 Di\u00f3s en el genitivo. Las formas m\u00e1s antiguas del nombre son las mic\u00e9nicas di-we y di-wo, escritas en lineal B.","aspectoevolutivo":"Su equivalente en la mitolog\u00eda romana era J\u00fapiter, en la etrusca, Tinia, en la egipcia, Am\u00f3n y en la cananea, Baal.","significado":"Zeus es la divinidad m\u00e1s importante de todo el pante\u00f3n griego. Era conocido como el padre de los dioses, soberano de mortales e inmortales.","imagen":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/2\/20\/Zeus_Otricoli_Pio-Clementino_Inv257.jpg\/220px-Zeus_Otricoli_Pio-Clementino_Inv257.jpg","equipo":"2","grupo":"603"}];

app.set('view engine', 'ejs')

app.listen(ppuerto, function() {
	console.log('Puerto', ppuerto)
})

function decodificarImagenes(resultados, callback) {
	for(var i = 0; i < resultados.length; i++) {
		resultados[i].imagen = decodeURIComponent(resultados[i].imagen)
		//console.log(resultados[i].imagen)
	}
	return callback(resultados)
}

function randomID(callback) {
	charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString = '';
    for (var i = 0; i < 4; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return callback(randomString);
}

app.get('/', function(req, res) {
	res.render('pages/index')
	//res.redirect('/')
	//res.sendStatus(403)
	//res.sendFile(__dirname + '/paginas/index.html')
})

function queryD(tipo, busqueda, callback) {
	var resultado = [];
	if (tipo == 'dios') {
		diosesJSON.forEach(function(e) {
			if(e.espanol == busqueda) {
				resultado.push(e);
				//return e;
			}
		})
	}
	if(tipo == 'grupo') {
		diosesJSON.forEach(function(e) {
			if(e.grupo == busqueda) {
				resultado[resultado.length] = e;
			}
		})
	}
	if(tipo == 'equipo') {
		diosesJSON.forEach(function(e) {
			if(e.equipo == busqueda) {
				resultado[resultado.length] = e;
			}
		})
	}
	if(tipo == 'publico') {
		diosesJSON.forEach(function(e) {
			if(e.oculto == 0) {
				resultado[resultado.length] = e;
			}
		})
	}
	return callback(resultado);
	console.log('RESULTADOS: [' + resultado.length + ']     ' + resultado);	 
	//console.log(diosesJSON.findIndex(espanol));
}

app.get('/busqueda', function(req, res){
	if(req.query.n != undefined) {
		console.log('n')
		queryD('dios', req.query.n, function(r) {
			console.log(r)
			res.render('pages/dios', {'dios': r[0], 'mensaje': undefined, 'imagen': decodeURIComponent(r[0].imagen)})
		})
		/*pool.query('SELECT * FROM dioses WHERE espanol=?', req.query.n, function(err, resultado) {
			if(err) throw err;
			if(resultado.length == 1) {
				res.render('pages/dios', {'dios': resultado[0], 'mensaje': undefined, 'imagen': decodeURIComponent(resultado[0].imagen)})
			} 
			else {
				decodificarImagenes(resultado, function(d){
					res.render('pages/bpn', {'b': req.query.n ,'dioses': d, 'resultados': d})
				})
			}
			
		})*/
	}
	else if(req.query.g != undefined) {
		console.log('g')
		queryD('grupo', req.query.g, function(resultado) {
			decodificarImagenes(resultado, function(d) {
				res.render('pages/bpg', {'grupo': req.query.g, 'dioses': d})
			})
		})
		/*pool.query('SELECT * FROM dioses WHERE grupo=?', req.query.g, function(err, resultado) {
			decodificarImagenes(resultado, function(d) {
				res.render('pages/bpg', {'grupo': req.query.g, 'dioses': d})
			})
		})*/
		
	}
	else if(req.query.e != undefined) {
		console.log('e')
		queryD('equipo', req.query.e, function(resultado) {
			decodificarImagenes(resultado, function(d) {
				res.render('pages/bpe', {'dioses': d, 'equipo': req.query.e})
			})
		})
		/*pool.query('SELECT * FROM dioses WHERE equipo=?', req.query.e, function(err, resultado){
			 decodificarImagenes(resultado, function(d) {
			 	res.render('pages/bpe', {'dioses': d, 'equipo': req.query.e})
			 })
		})*/
		//res.render('pages/bpe')
	}
	else {
		console.log('nd')
		res.sendStatus(402)
	}
})


/*app.get('/busqueda', function(req, res){
	if(req.query.n != undefined) {
		console.log('n')
		pool.query('SELECT * FROM dioses WHERE espanol=?', req.query.n, function(err, resultado) {
			if(err) throw err;
			if(resultado.length == 1) {
				res.render('pages/dios', {'dios': resultado[0], 'mensaje': undefined, 'imagen': decodeURIComponent(resultado[0].imagen)})
			} 
			else {
				decodificarImagenes(resultado, function(d){
					res.render('pages/bpn', {'b': req.query.n ,'dioses': d, 'resultados': d})
				})
			}
			
		})
	}
	else if(req.query.g != undefined) {
		console.log('g')
		pool.query('SELECT * FROM dioses WHERE grupo=?', req.query.g, function(err, resultado) {
			decodificarImagenes(resultado, function(d) {
				res.render('pages/bpg', {'grupo': req.query.g, 'dioses': d})
			})
		})
		
	}
	else if(req.query.e != undefined) {
		console.log('e')
		pool.query('SELECT * FROM dioses WHERE equipo=?', req.query.e, function(err, resultado){
			 decodificarImagenes(resultado, function(d) {
			 	res.render('pages/bpe', {'dioses': d, 'equipo': req.query.e})
			 })
		})
		//res.render('pages/bpe')
	}
	else {
		console.log('nd')
		res.sendStatus(402)
	}
})*/

app.get('/dioses', function(req, res) {
	queryD('publico', undefined, function(resultado) {
		decodificarImagenes(resultado, function(r) {
			//res.render('pages/index')
			res.render('pages/main', {'dioses': r})
		})
	})
	//pool.query('SELECT imagen, espanol, significado FROM dioses WHERE oculto=0', function(err, resultado) {
		//if(err) throw err.code;
		
		
		//res.send(resultado).status(200)
	//})
})

/*app.get('/dios', function(req, res) {
	res.redirect('/getDios')
})*/

app.get('/modificar', function(req, res) {
	res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'Esta funcion no está disponible.'})
	//res.sendStatus(403);
	/*pool.query('SELECT * FROM dioses WHERE id=?', req.query.id, function(err, resultado){
		decodificarImagenes(resultado[0], function(r) {
			res.render('pages/modificar', {'data': r, 'imagen': r.imagen})
		})
	})*/
})

app.get('/dios', function(req, res) {
	if(req.query.dios != undefined) {
			queryD('dios', req.query.dios, function(results) {
				res.render('pages/dios', {'dios' : results[0], 'mensaje': '', 'imagen': decodeURIComponent(results[0].imagen)})
			})
			/*pool.query('SELECT * FROM dioses WHERE espanol=?', req.query.dios, function(err, results) {
				if(err) throw err.code;
				res.render('pages/dios', {'dios' : results[0], 'mensaje': '', 'imagen': decodeURIComponent(results[0].imagen)})
			})*/
		}
		else {
			res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'El parametro dios no fue especificado.'})
			//res.send('Falta parametro dios').status(400)
		}
})

app.get('/postDios', function(req, res) {
	if(req.query.recuperacion != undefined) {
			if(req.query.espanol != undefined) {
				if(req.query.griego != undefined) {
					if(req.query.transliteracion != undefined) {
						if(req.query.aspectohistorico != undefined) {
							if(req.query.aspectoestructural != undefined) {
								if(req.query.aspectoevolutivo != undefined) {
									if(req.query.significado != undefined) {
										if(req.query.imagen != undefined) {
											if(req.query.equipo != undefined) {
												if(req.query.grupo != undefined ) {
													var valores = [req.query.recuperacion, req.query.espanol, req.query.griego, req.query.transliteracion, req.query.aspectohistorico, req.query.aspectoestructural, req.query.aspectoevolutivo, req.query.significado, req.query.imagen, req.query.equipo, req.query.grupo];
													pool.query('INSERT INTO dioses (recuperacion, espanol, griego, transliteracion, aspectohistorico, aspectoestructural, aspectoevolutivo, significado, imagen, equipo, grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', valores, function(err, resultado) {
														if(err) throw err;
														//res.send(JSON.parse('{"estado": "ok", "dios": "' + req.query.espanol + '"}'))	
														res.redirect('dios?dios=' + req.query.espanol)
														//res.render('pages/dios', {'dios' : req.query.espanol, 'mensaje': 'Se publico correctamente', 'imagen': decodeURIComponent(req.query.imagen)})
													})
												}
												else {
													res.send('Falta parametro grupo').status(400)
												}
											}
											else {
												res.send('Falta parametro equipo').status(400)
											}
										}
										else {
											res.send('Falta parametro imagen').status(400)
										}
									}
									else {
										res.send('Falta parametro significado').send(400)
									}
								}
								else {
									res.send('Falta parametro aspectoevolutivo').status(400)
								}
							}
							else {
								res.send('Falta parametro aspectoestructural').status(400)
							}
						}
						else {
							res.send('Falta parametro aspectohistorico').status(400)
						}
					}
					else {
						res.send('Falta parametro transliteracion').status(400)
					}
				}
				else {
					res.send('Falta parametro griego').status(400)
				}
			}
			else {
				res.send('Falta parametro espanol').status(400)
			}
		}
		else {
			res.send('Falta parametro recuperacion').status(400)
		}
})

app.get('/putDios', function(req, res) {
	res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'Esta funcion no está disponible.'})
	/*if(req.query.recuperacion != undefined) {
		if(req.query.espanolo != undefined) {
			pool.query('SELECT recuperacion FROM dioses WHERE espanol=?', req.query.espanolo, function(err, resultadou){
				if(err) throw err.code;
				console.log(resultadou[0].recuperacion)
				if(resultadou[0].recuperacion == req.query.recuperacion) {
					// ALV 
					if(req.query.recuperacion != undefined) {
						if(req.query.espanol != undefined) {
							if(req.query.griego != undefined) {
								if(req.query.transliteracion != undefined) {
									if(req.query.aspectohistorico != undefined) {
										if(req.query.aspectoestructural != undefined) {
											if(req.query.aspectoevolutivo != undefined) {
												if(req.query.significado != undefined) {
													if(req.query.imagen != undefined) {
														if(req.query.equipo != undefined) {
															if(req.query.grupo != undefined ) {
																var valores = [req.query.espanol, req.query.griego, req.query.transliteracion, req.query.aspectohistorico, req.query.aspectoestructural, req.query.aspectoevolutivo, req.query.significado, req.query.imagen, req.query.equipo, req.query.grupo, req.query.recuperacion];
																pool.query('UPDATE dioses SET espanol=?, griego=?, transliteracion=?, aspectohistorico=?, aspectoestructural=?, aspectoevolutivo=?, significado=?, imagen=?, equipo=?, grupo=? WHERE recuperacion=?', valores, function(err, resultado) {
																	if(err) throw err;
																	res.redirect('/dios?dios=' + req.query.espanol)
																	//res.send(JSON.parse('{"estado": "ok", "dios": "' + req.query.espanol + '", "tipo": "modificar"}')).status(202)	
																})
															}
															else {
																res.send('Falta parametro grupo').status(400)
															}
														}
														else {
															res.send('Falta parametro equipo').status(400)
														}
													}
													else {
														res.send('Falta parametro imagen').status(400)
													}
												}
												else {
													res.send('Falta parametro significado').send(400)
												}
											}
											else {
												res.send('Falta parametro aspectoevolutivo').status(400)
											}
										}
										else {
											res.send('Falta parametro aspectoestructural').status(400)
										}
									}
									else {
										res.send('Falta parametro aspectohistorico').status(400)
									}
								}
								else {
									res.send('Falta parametro transliteracion').status(400)
								}
							}
							else {
								res.send('Falta parametro griego').status(400)
							}
						}
						else {
							res.send('Falta parametro espanol').status(400)
						}
					}
					else {
						res.send('Falta parametro recuperacion').status(400)
					}
				}
				else {
					res.send('El codigo de recuperacion no es el correcto').status(401)
				}
			})
		}
		else{
			res.send('Falta el parametro espanol').status(400)
		}
	}
	else {
		res.send('Falta el parametro recuperacion').status(400)
	}*/
})

app.get('/eliminar', function(req, res) {
	res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'Esta funcion no está disponible.'})
	/*pool.query('SELECT * FROM dioses WHERE id=?', req.query.dios, function(err, resultado){
		decodificarImagenes(resultado, function(d) {
			res.render('pages/eliminar', {'dios': resultado[0], 'id': resultado[0].id})
		})
	})*/
	
})

app.get('/deleteDios', function(req, res) {
	/*if(req.query.recuperacion != undefined) {
		if(req.query.espanol != undefined) {
			pool.query('SELECT recuperacion FROM dioses WHERE espanol=?', req.query.espanol, function(err, resultado) {
				if(err) throw err.code;
				if(req.query.recuperacion == resultado[0].recuperacion) {
					pool.query('DELETE FROM dioses WHERE espanol=?', req.query.espanol, function(err, resultadod) {
						res.redirect('/dioses')
						//res.send('{"estado": "ok", "dios": "' + req.query.espanol +'"}').status(201)
					})
				}
				else {
					res.send('El codigo de recuperacion no es correcto').status(401)
				}
			})
		}
		else {
			res.send('Falta el parametro espanol')
		}
	}
	else {
		res.send('Falta el codigo de recuperacion')
	}*/
	res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'Esta funcion no está disponible.'})
})

app.get('/animaciones', function(req, res){
	res.redirect('https://dioses.vcano5.com/animaciones')
})

app.get('/formulario', function(req, res) {
	res.render('pages/borrado', {'redirect': '/', 'tipo': 'danger', 'mensaje': 'Esta funcion no está disponible.'})
	/*randomID(function(r) {
		res.render('pages/formulario', {"id": r})
	})*/
})	