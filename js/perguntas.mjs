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

/*Função para gerar as opções de respostas*/

const geraOpcoes = (respostaCorretaValor, respostasErradas) => {
	let array = []
	let respostaCorretaPosicao = getRandomInt(1,5)
	for (let i = 1, j = 0; i <= 4; i++) {
		if (i === respostaCorretaPosicao) {
			array.push(`<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
									<label for="radio${i}">${respostaCorretaValor}</label>`)
		} else {
			array.push(`<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
								 	<label for="radio${i}">${respostasErradas[j]}</label>`)
			j++
		}
	}
	return array
}

/*Gera dados para serem colocados nas respostas erradas*/

const respostasErradasNomeMus = (artMus, respostaCorretaPosicao) => {
	let result
	for (let i = 0; i < 3; i++) {
		if (i !== respostaCorretaPosicao)
			result.push(artMus[i].musDesc)
		else
			result.push(artMus[3].musDesc)
	}
	return result
}

const respostasErradasArtist = (artMus, respostaCorretaPosicao) => {
	let result
	for (let i = 0; i < 3; i++) {
		if (i !== respostaCorretaPosicao)
			result.push(artMus[i].artDesc)
		else
			result.push(artMus[3].artDesc)
	}
	return result
}

const geraTrechoMus = letra => {
	// let regex = new regExp('(.+? ){4}([^ ]+)')
	// resposta: letra.split("\n").slice(5, 7).join("<br>")
	return letra.split("\n").slice(0, 5).join("<br>")
}

/*função para gerar pergunta
	-parametros - possiveis perguntas do jogo, a quantidade de artistas selecionado (vazio ou um artista especifico) e o vetor com as urls das musicas dos artistas pra requisicao
	-retorno - insere o html de um pergunta e suas possiveis respostas no codigo e retorna a resposta certa (1,2,3ou4)*/

export function geraPerguntas (perguntas, questions, parametroPergunta, artist, artMus, key, teste) {
 	let random = getRandomInt (0, perguntas.length)
	let respCorreta = getRandomInt (1, 5)
	let htmlPergunta = `<h2>${perguntas[random]}</h2>`

	function perguntaModelo1 () {
		parametroPergunta.innerHTML = ''
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	async function perguntaModelo2 () {
		return artMus.then(v => {
			let resultado
			const respostaCorretaPosicao = getRandomInt(0,v.length)
			const urlLetra = `https://api.vagalume.com.br/search.php?art=${v[respostaCorretaPosicao].artUrl}&mus=${v[respostaCorretaPosicao].musDesc}&key=${key}`

			const letraMusica = fetch(urlLetra)
																				 .then(resposta => resposta.json())
																				 .then(json => {
																					 return json.mus[0].text
																				 })
			resultado += '<h3>Leia a Letra -> Acerte o nome do Cantor</h3>'
			resultado += geraTrechoMus(letraMusica)
			resultado += '<h3>Faça a sua escolha</h3>'
			resultado += geraOpcoes(v[respostaCorretaPosicao].musDesc, respostasErradasNomeMus(v, respostaCorretaPosicao))
			return opcoes
		})
	}

	async function perguntaModelo3 () {
		artMus.then(v => {
			let respostaCorretaPosicao = getRandomInt(0,v.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${v[respostaCorretaPosicao].artUrl}&mus=${v[respostaCorretaPosicao].musDesc}&key=${key}`

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("\n")
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${v[respostaCorretaPosicao].artDesc}</label>`
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
			let respostaCorretaPosicao = getRandomInt(0,v.length)
			let urlLetra = `https://www.vagalume.com.br/${v[respostaCorretaPosicao].artUrl}/index.js`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = "https://www.vagalume.com.br/"
								 letra += json.artist.pic_small
								 parametroPergunta.innerHTML += `<img src="${letra}" alt="">`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${v[respostaCorretaPosicao].artDesc}</label>`
				} else {
					htmlRespostas += `<input type="radio" class="radio-inline" value="respErrada name="optradio" id="radio${i}">
														<label for="radio${i}">${v[getRandomInt(0,v.length)].artDesc}</label>`
				}
			}
			questions.innerHTML += htmlRespostas
		})
	}

	function perguntaModelo5 () {
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	async function perguntaModelo6 () {
		artMus.then(v => {
			let artMusFilter = filtroArtista(v, artist) // ?? Verificar
			let respostaCorretaPosicao = getRandomInt(0,artMusFilter.length)
			let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMusFilter[respostaCorretaPosicao].artUrl}&mus=${artMusFilter[respostaCorretaPosicao].musDesc}&key=${key}`
			let htmlRespostas = ''

			parametroPergunta.innerHTML = ''
			fetch(urlLetra)
							 .then(resposta => resposta.json())
							 .then(json => {
								 let letra = json.mus[0].text
								 let trecho = letra.split("\n").slice(0, 5).join("\n").replace('\ (?=[A-Z])', '\n')
								 parametroPergunta.innerHTML += `<p>${trecho}</p>`
							 })
			questions.innerHTML = ''
			questions.innerHTML += htmlPergunta
			for (let i = 1; i <= 4; i++) {
				if (i===respCorreta) {
					console.log(artMusFilter);
					htmlRespostas += `<input type="radio" class="radio-inline" value="respCorreta name="optradio" id="radio${i}">
														<label for="radio${i}">${artMusFilter[respostaCorretaPosicao].musDesc}</label>`
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
