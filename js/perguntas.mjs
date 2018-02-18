artistimport {getRandomInt} from './random.mjs'

/*Funcao utilizada para filtrar as musicas por artistas

Retorno:
	Artista vazio - Ele envia o array com as todos os links de letras de musicas de
todos os artistas disponivel na playlist
	Artista escolhido - Ele envia o array de links de letras de musicas do artista escolhido

Parametro:
	artistas - recebe um array com todos os artistas e músicas com as variaveis reduzidas pela
funcao diminJSON()
*/
function filtroArtista (artistas) {
	let teste = []
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


export function geraPerguntas (perguntas, questions, parametroPergunta, artist, artMus) {
 	let random = getRandomInt (0, perguntas.length)
	let respCorreta = getRandomInt (1, 5)
	let htmlPergunta = `<h2>${perguntas[random]}</h2>`

	function perguntaModelo1 () {
		parametroPergunta.innerHTML = ''
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	function perguntaModelo2 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMus[randomMusic].artUrl}&mus=${artMus[randomMusic].musDesc}&key=${key}`
		let htmlRespostas = ''

		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		htmlRespostas += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				htmlRespostas += `<option value="respCorreta">${artMus[randomMusic].musDesc}</option>`
			} else {
				htmlRespostas += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].musDesc}</option>`
			}
		}
		htmlRespostas += `</select>`
		questions.innerHTML += htmlRespostas
	}

	function perguntaModelo3 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMus[randomMusic].artUrl}&mus=${artMus[randomMusic].musDesc}&key=${key}`
		let htmlRespostas = ''


		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		htmlRespostas += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				htmlRespostas += `<option value="respCorreta">${artMus[randomMusic].artDesc}</option>`
			} else {
				htmlRespostas += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].artDesc}</option>`
			}
		}
		htmlRespostas += `</select>`
		questions.innerHTML += htmlRespostas
	}

	function perguntaModelo4 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://www.vagalume.com.br/${artMus[randomMusic].artUrl}/index.js`
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
		htmlRespostas += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				htmlRespostas += `<option value="respCorreta">${artMus[randomMusic].artDesc}</option>`
			} else {
				htmlRespostas += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].artDesc}</option>`
			}
		}
		htmlRespostas += `</select>`
		questions.innerHTML += htmlRespostas
	}

	function perguntaModelo5 () {
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	function perguntaModelo6 () {
		let artMusFilter = filtroArtista(artMus)
		let randomMusic = getRandomInt(0,artMusFilter.length)
		let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMusFilter[randomMusic].artUrl}&mus=${artMusFilter[randomMusic].musDesc}&key=${key}`
		let htmlRespostas = ''

		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		htmlRespostas += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				htmlRespostas += `<option value="respCorreta">${artMusFilter[randomMusic].musDesc}</option>`
			} else {
				htmlRespostas += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].musDesc}</option>`
			}
		}
		htmlRespostas += `</select>`
		questions.innerHTML += htmlRespostas
	}

	if (artist === 'vazio') {
		console.log (random)
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
