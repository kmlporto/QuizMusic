import {getRandomInt} from './random.mjs'

// Chave do vagalume
const key = 'c3f6644637dc1802b86c528e33ba0f78'

// Retorna um array retirado da promessa
async function filtroArtista (artMus, artistaSelecionado) {
	let array = [], i
	return await artMus.then (v => {
		if (artistaSelecionado !== 'vazio') {
			for (i = 0; i < v.length; i++) {
				if(artistaSelecionado === v[i].artUrl)
					array.push(v[i])
			}
			return array
		}	else {
			return v
		}
	})

}

/*Função para gerar as opções de respostas*/
const geraOpcoes = (respostaCorretaValor, respostasErradas) => {
	let array = []
	let respostaCorretaPosicao = getRandomInt(1,5)
	for (let i = 1, j = 0; i <= 4; i++, j++) {
		if (i === respostaCorretaPosicao) {
			array.push(`<input type="radio" class="radio-inline respCorreta" value="respCorreta" name="optradio" id="radio${i}">
									<label for="radio${i}">${respostaCorretaValor}</label>`)
		} else {
			array.push(`<input type="radio" class="radio-inline" value="respErrada" name="optradio" id="radio${i}">
								 	<label for="radio${i}">${respostasErradas[j]}</label>`)
		}
	}
	return array
}

/*Gera dados para serem colocados nas respostas erradas*/
const respostasErradasNomeMus = (artMus, respostaCorretaPosicao) => {
	let result = []
	for (let i = 0; i < 3; i++) {
		if (i !== respostaCorretaPosicao)
			result.push(artMus[i].musDesc)
		else
			result.push(artMus[3].musDesc)
	}
	return result
}

const respostasErradasArtist = (artMus, respostaCorretaPosicao) => {
	let result = []
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

const geraLetra = async function (artista, musica) {
	const urlLetra = `https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}&key=${key}`
	return await fetch(urlLetra)
															.then(resposta => resposta.json())
															.then(json => {
															 	return json.mus[0].text
														 	})
}

//Tipos de pergunta

async function perguntaCompleteLetra (artMus) {
	const respostaCorretaPosicao = getRandomInt(0,artMus.length)
	const letraMusica = await geraLetra (artMus[respostaCorretaPosicao].artUrl, artMus[respostaCorretaPosicao].musDesc)
  let regexp = new RegExp('(.+? ){4}([^ ]+)')
	return `<h3>Complete a letra</h3>
					<p>${geraTrechoMus(letraMusica)}</p>
					<h3>Digite a resposta</h3>
					<input type= "text" pattern= "${regexp}" id="completeLetra" placeholder="Digite as proximas 5 palavas">`
}

async function perguntaNomeArtista (artMus) {
	const respostaCorretaPosicao = getRandomInt(0,artMus.length)
	const letraMusica = await geraLetra (artMus[respostaCorretaPosicao].artUrl, artMus[respostaCorretaPosicao].musDesc)
	return `<h3>A letra , pertence a qual Artista/Banda?</h3>
					<p>${geraTrechoMus(letraMusica)}</p>
					<h3>Faça a sua escolha</h3>
					${geraOpcoes(artMus[respostaCorretaPosicao].artDesc, respostasErradasArtist(artMus, respostaCorretaPosicao))}`
}
async function perguntaFotoArtista (artMus) {
	const respostaCorretaPosicao = getRandomInt(0,artMus.length)
	const urlLetra = `https://www.vagalume.com.br/${artMus[respostaCorretaPosicao].artUrl}/index.js`

	const urlFotoArtista = fetch(urlLetra)
																		 .then(resposta => resposta.json())
																		 .then(json => {
																			 return json.artist.pic_small
																		 })
	return `<h3>Qual o Artista/Banda ilustrado na foto?</h3>
					<img src="https://www.vagalume.com.br/${urlFotoArtista}" alt="">
					<h3>Faça a sua escolha</h3>
					${geraOpcoes(artMus[respostaCorretaPosicao].artDesc, respostasErradasArtist(artMus, respostaCorretaPosicao))}`
}
async function perguntaNomeMus (artMus) {
	const respostaCorretaPosicao = getRandomInt(0,artMus.length)
	const letraMusica = await geraLetra (artMus[respostaCorretaPosicao].artUrl, artMus[respostaCorretaPosicao].musDesc)
	return `<h3>Acerte a nome da música</h3>
					<p>${geraTrechoMus(letraMusica)}</p>
					<h3>Faça a sua escolha</h3>
					${geraOpcoes(artMus[respostaCorretaPosicao].musDesc, respostasErradasNomeMus(artMus, respostaCorretaPosicao))}`

}

export async function geraPerguntas (artMus, artistaSelecionado, numeroPerguntas) {
	let arrayPerguntas = []
	// let perguntas = {
	// 	 								artist: ['Complete a letra ',
	//                  						'Acerte a nome da música'],
	// 								  genero: ['A letra , pertence a qual Artista/Banda?',
	//                  					 'Qual o Artista/Banda ilustrado na foto?']
	// 								}
	for (let i = 1; i <= numeroPerguntas; i++) {
		let artMusFilter = await filtroArtista(artMus, artistaSelecionado)
		if (artistaSelecionado === 'vazio') {
			let random = getRandomInt(1,5)
			switch (random) {
				case 1:
					arrayPerguntas.push(perguntaCompleteLetra(artMusFilter))
					break;

				case 2:
					arrayPerguntas.push(perguntaNomeArtista(artMusFilter))
					break;

				case 3:
					arrayPerguntas.push(perguntaFotoArtista(artMusFilter))
					break;

				case 4:
					arrayPerguntas.push(perguntaNomeMus(artMusFilter))
					break;
			}
		} else {
			let random = getRandomInt(1,3)
			switch (random) {
				case 1:
					arrayPerguntas.push(perguntaCompleteLetra(artMusFilter))
					break;

				case 2:
					arrayPerguntas.push(perguntaNomeMus(artMusFilter))
					break;
			}
		}
	}
	return arrayPerguntas
}

export async function exibePergunta (arrayPerguntas, posicaoPergunta, seletor) {
	seletor.innerHTML = ''
  console.log(posicaoPergunta);
	arrayPerguntas.then(v => {
									console.log(v);
									console.log(posicaoPergunta);
									v[posicaoPergunta].then(resposta => {
										console.log(resposta);
										seletor.insertAdjacentHTML('afterbegin',resposta)
									})
								})
	return ++posicaoPergunta
}
