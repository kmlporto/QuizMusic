import {getRandomInt} from './random.mjs'


// Chave do vagalume

const key = 'c3f6644637dc1802b86c528e33ba0f78'


function filtroArtista (artistas, artistaSelecionado) {
	let array = [], i
	for (i = 0; i < artistas.length; i++)
		if(artistaSelecionado === artistas[i].artUrl)
			array.push(artistas[i])
	return array
}

/*Função para gerar as opções de respostas*/

const geraOpcoes = (respostaCorretaValor, respostasErradas) => {
	let array = []
	let respostaCorretaPosicao = getRandomInt(1,5)
	for (let i = 1, j = 0; i <= 4; i++) {
		if (i === respostaCorretaPosicao) {
			array.push(`<input type="radio" class="radio-inline" value="respCorreta" name="optradio" id="radio${i}">
									<label for="radio${i}">${respostaCorretaValor}</label>`)
		} else {
			array.push(`<input type="radio" class="radio-inline" value="respErrada" name="optradio" id="radio${i}">
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
	// resposta: letra.split("\n").slice(5, 7).join("<br>")
	return letra.split("\n").slice(0, 5).join("<br>")
}

//Tipos de pergunta

async function perguntaCompleteLetra (artMus) {
	return artMus.then(v => {
		const respostaCorretaPosicao = getRandomInt(0,v.length)
		const urlLetra = `https://api.vagalume.com.br/search.php?art=${v[respostaCorretaPosicao].artUrl}&mus=${v[respostaCorretaPosicao].musDesc}&key=${key}`

		const letraMusica = fetch(urlLetra)
																			 .then(resposta => resposta.json())
																			 .then(json => {
																				 return json.mus[0].text
																			 })
	  let regex = new regExp('(.+? ){4}([^ ]+)')
		return `<h3>Leia a Letra -> Acerte o nome do Cantor</h3>
						<p>${geraTrechoMus(letraMusica)}</p>
						<h3>Digite a resposta</h3>
						<input type= "text" pattern= "${regex}" id="completeLetra" placeholder="Digite as proximas 5 palavas">`
	})
}


async function perguntaNomeArtista (artMus) {
	return artMus.then(v => {
		const respostaCorretaPosicao = getRandomInt(0,v.length)
		const urlLetra = `https://api.vagalume.com.br/search.php?art=${v[respostaCorretaPosicao].artUrl}&mus=${v[respostaCorretaPosicao].musDesc}&key=${key}`

		const letraMusica = fetch(urlLetra)
																			 .then(resposta => resposta.json())
																			 .then(json => {
																				 return json.mus[0].text
																			 })
		return `<h3>Leia a Letra -> Acerte o nome do Cantor</h3>
						<p>${geraTrechoMus(letraMusica)}</p>
						<h3>Faça a sua escolha</h3>
						${geraOpcoes(v[respostaCorretaPosicao].artDesc, respostasErradasArtist(v, respostaCorretaPosicao))}`
	})
}
async function perguntaFotoArtista (artMus) {
	return artMus.then(v => {
		const respostaCorretaPosicao = getRandomInt(0,v.length)
		const urlLetra = `https://www.vagalume.com.br/${v[respostaCorretaPosicao].artUrl}/index.js`

		const urlFotoArtista = fetch(urlLetra)
																			 .then(resposta => resposta.json())
																			 .then(json => {
																				 return json.artist.pic_small
																			 })
		return `<h3>Leia a Letra -> Acerte o nome do Cantor</h3>
						<img src="https://www.vagalume.com.br/${urlFotoArtista}" alt="">
						<h3>Faça a sua escolha</h3>
						${geraOpcoes(v[respostaCorretaPosicao].artDesc, respostasErradasArtist(v, respostaCorretaPosicao))}`
	})
}
async function perguntaNomeMus (artMus) {
	return artMus.then(v => {
		const respostaCorretaPosicao = getRandomInt(0,artMusFilter.length)
		const urlLetra = `https://api.vagalume.com.br/search.php?art=${artMusFilter[respostaCorretaPosicao].artUrl}&mus=${artMusFilter[respostaCorretaPosicao].musDesc}&key=${key}`

		const letraMusica = fetch(urlLetra)
																			 .then(resposta => resposta.json())
																			 .then(json => {
																				 return json.mus[0].text
																			 })
		return `<h3>Leia a Letra -> Acerte o nome do Cantor</h3>
						<p>${geraTrechoMus(letraMusica)}</p>
						<h3>Faça a sua escolha</h3>
						${geraOpcoes(v[respostaCorretaPosicao].musDesc, respostasErradasNomeMus(v, respostaCorretaPosicao))}`
	})
}

export function geraPerguntas (perguntas, artMus, artistaSelecionado) {

	// let perguntas = {
	// 	 								artist: ['Complete a letra ',
	//                  						'Acerte a nome da música'],
	// 								  genero: ['A letra , pertence a qual Artista/Banda?',
	//                  					 'Qual o Artista/Banda ilustrado na foto?']
	// 								}
	let perguntaSort
	if (artistSelecionado === 'vazio') {
		let random = getRandomInt(1,4)
		switch (expression) {
			case 1:
				perguntaCompleteLetra (artMus)
				break;

			case 2:
				perguntaNomeArtista (artMus)
				break;
		}
	} else {
		let random = getRandomInt(1,4)
		switch (expression) {
			case 1:
				perguntaCompleteLetra (filtroArtista(artMus, artistaSelecionado))
				break;

			case 2:
				perguntaNomeMus (filtroArtista(artMus, artistaSelecionado))
				break;
		}
	}
}
