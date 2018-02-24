import {getRandomInt} from './random.mjs'

/*Funcao utilizada para filtrar as musicas por artistas

Retorno:
	Artista vazio - Ele envia o array com as todos os links de letras de musicas de
todos os artistas disponivel na playlist
	Artista escolhido - Ele envia o array de links de letras de musicas do artista escolhido

Parametro:
	artistas - recebe um array com todos os artistas e músicas com as variaveis reduzidas pela
funcao diminJSON()
*/
function filtroArtista (artistas, artist) {
	let teste = [], i
	if (artist !== 'vazio') {
		for (i = 0; i < artistas.length; i++) {
			if(artist === artistas[i].artUrl)
				teste.push(artistas[i])
		}
		artistas = teste
	}
	return teste
}

/*função para gerar pergunta
	-parametros - possiveis perguntas do jogo, a quantidade de artistas selecionado (vazio ou um artista especifico) e o vetor com as urls das musicas dos artistas pra requisicao
	-retorno - insere o html de um pergunta e suas possiveis respostas no codigo e retorna a resposta certa (1,2,3ou4)*/


export function geraPerguntas (perguntas, questions, parametroPergunta, artist, artMus, key) {
 	let random = getRandomInt (0, perguntas.length)
	let respCorreta = getRandomInt (1, 5)
	let htmlPergunta = `<h2>${perguntas[random]}</h2>`

	async function perguntaModelo1 () {
		artMus.then(v => {
			let randomMusic = getRandomInt(0,v.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${v[randomMusic].artUrl}&mus=${v[randomMusic].musDesc}&key=${key}`
			let htmlRespostas = ''
			let regexp = new RegExp('(.+? ){4}([^ ]+)')

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("<br>")
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta

		// 	<input type="radio" id="contactChoice1"
    //  name="contact" value="email">
    // <label for="contactChoice1">Email</label>

			htmlRespostas += `<h3>Digite a resposta</h3>
														<input type= "text" pattern= "${regexp}" id="completeLetra" placeholder="Digite as proximas 5 palavas">`
			questions.innerHTML += htmlRespostas
		})
	}

	async function perguntaModelo2 () {
		artMus.then(v => {
			let randomMusic = getRandomInt(0,v.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${v[randomMusic].artUrl}&mus=${v[randomMusic].musDesc}&key=${key}`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("<br>")
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta

		// 	<input type="radio" id="contactChoice1"
    //  name="contact" value="email">
    // <label for="contactChoice1">Email</label>

			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${v[randomMusic].musDesc}</label>`
				} else {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
														<label for="radio${i}">${v[getRandomInt(0,v.length)].musDesc}</label>`
				}
			}
			questions.innerHTML += htmlRespostas
		})
	}

	async function perguntaModelo3 () {
		artMus.then(v => {
			let randomMusic = getRandomInt(0,v.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${v[randomMusic].artUrl}&mus=${v[randomMusic].musDesc}&key=${key}`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("<br>")
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${v[randomMusic].artDesc}</label>`
				} else {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
														<label for="radio${i}">${v[getRandomInt(0,v.length)].artDesc}</label>`
				}
			}
			questions.innerHTML += htmlRespostas
		})
	}

	async function perguntaModelo4 () {
		artMus.then(v => {
			let randomMusic = getRandomInt(0,v.length)
			let urlLetra = `https://www.vagalume.com.br/${v[randomMusic].artUrl}/index.js`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = "https://www.vagalume.com.br/"
								 letra += json.artist.pic_medium
								 parametroPergunta.innerHTML += `<img src="${letra}" alt="">`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${v[randomMusic].artDesc}</label>`
				} else {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
														<label for="radio${i}">${v[getRandomInt(0,v.length)].artDesc}</label>`
				}
			}
			questions.innerHTML += htmlRespostas
		})
	}

	function perguntaModelo5 () {
		artMus.then(v => {
			let artMusFilter = filtroArtista(v, artist) // ?? Verificar
			let randomMusic = getRandomInt(0,artMusFilter.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMusFilter[randomMusic].artUrl}&mus=${artMusFilter[randomMusic].musDesc}&key=${key}`
			let htmlRespostas = ''
			let regexp = new RegExp('(.+? ){4}([^ ]+)')

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("<br>")
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta

		// 	<input type="radio" id="contactChoice1"
    //  name="contact" value="email">
    // <label for="contactChoice1">Email</label>

			htmlRespostas += `<h3>Digite a resposta</h3>
														<input type= "text" pattern= "${regexp}" id="completeLetra" placeholder="Digite as proximas 5 palavas">`
			questions.innerHTML += htmlRespostas
		})
	}

	async function perguntaModelo6 () {
		artMus.then(v => {
			let artMusFilter = filtroArtista(v, artist) // ?? Verificar
			let randomMusic = getRandomInt(0,artMusFilter.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMusFilter[randomMusic].artUrl}&mus=${artMusFilter[randomMusic].musDesc}&key=${key}`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("<br>").replace('\ (?=[A-Z])', '\n')
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					console.log(artMusFilter);
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${artMusFilter[randomMusic].musDesc}</label>`
				} else {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
														<label for="radio${i}">${v[getRandomInt(0,v.length)].musDesc}</label>`
				}
			}
			questions.innerHTML += htmlRespostas
		})
	}

	if (artist === 'vazio') {
		if (random === 0) {
			perguntaModelo1()
		}
		if (random === 1) {
			perguntaModelo2()
		}
		if (random === 2) {
			perguntaModelo3()
		}
		if (random === 3) {
			perguntaModelo4()
		}
	}	else {
		random = getRandomInt (0,2)
		htmlPergunta = `<h2>${perguntas[random]}</h2>`
		random === 0 ? perguntaModelo5() : perguntaModelo6()
	}
}
