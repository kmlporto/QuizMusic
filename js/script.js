//CONSTRUÇÃO DE PROTOTYPES

Array.prototype.uniq = function () {
	let uniq = []
	let values = this
	values.forEach(function (v) {
  	if (!uniq.includes(v))
  	uniq.push(v)
	})
  	return uniq
}

//DECLARACAO DE VARIÁVEIS

let perguntas = ['Complete a letra ',
                 'Acerte a nome da música',
								 'A letra , pertence a qual Artista/Banda?',
                 'Qual o Artista/Banda ilustrado na foto?']

var genero = document.querySelector('#generoMusical')
var artist = document.querySelector('#art-banda')
var numPer = document.querySelector('#numPer')
var parametroPergunta = document.querySelector ('.parametroPergunta')
var questions = document.querySelector('.perguntas')
var botaoIniciar = document.querySelector('.botao')
// Variavel pra pegar o nome das musicas e artistas nas funcoes
var artMus = []
//var arrayMusicas = {}
// Chave do vagalume
var key = 'c3f6644637dc1802b86c528e33ba0f78'

//CONSTRUÇÃO DAS FUNÇÕES DA APLICAÇÃO

/*Funcao utilizada para diminuir a quantidade de dados do JSON
Retorno: json menor, com apenas dois dados
Parametro: json completo, com todas as informacoes da playslist
*/
function diminJSON (itensPlaylist) {
	const diminVar = item => {
		let art = {
			artUrl: item.artUrl,
			musDesc: item.musDesc,
			artDesc: item.artDesc
		}
		return art
	}
	if (itensPlaylist !==  undefined)
		return itensPlaylist.map(diminVar)
}

//função para mandar a resposta anterior para pegar artistas daquele genero no json do vagalume via url
function achaArt(resp_gen){
	let url = `https://www.vagalume.com.br/browse/style/${resp_gen}.js`
  const itemArt = i => `<option value="${i.artUrl}">${i.artDesc}</option>`
  const result = (item) => {
		artMus = diminJSON(item.playlist)
		artist.innerHTML = '<option value="vazio"></option>' //forçar o usuario a tomar uma opção ou deixar vazio
    artist.innerHTML += item.playlist.map(itemArt).sort().uniq().join('')
  }
  fetch(url)
						.then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
						.then(result) //aqui vai oq vc faz com a resposta definitiva
}

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
	if (artist.value !== 'vazio') {
		for (i = 0; i < artistas.length; i++) {
			if(artist.value === artistas[i].artUrl)
				teste.push(artistas[i])
		}
		artistas = teste
	}
	//Transforma em link as informacoes do json escolhido
	const urlLetra = (item) => {
		return `https://api.vagalume.com.br/search.php?art=${item.artUrl}&mus=${item.musDesc}&key=${key}`
	}
	return artistas.map(urlLetra)

}

/*Função para gerar a selecao aleatória das perguntas
(Funcao floor faz com que o numero seja arredondado pra baixo)*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*função para gerar pergunta
	-parametros - possiveis perguntas do jogo, a quantidade de artistas selecionado (vazio ou um artista especifico) e o vetor com as urls das musicas dos artistas pra requisicao
	-retorno - insere o html de um pergunta e suas possiveis respostas no codigo e retorna a resposta certa (1,2,3ou4)*/
function geraPerguntas (perguntas) {
	//let perguntas = ['Complete a letra ',
		//	                 'Acerte a nome da música',
			//								 'A letra , pertence a qual Artista/Banda?',
			  //               'Qual o Artista/Banda ilustrado na foto?']
 	let random = getRandomInt (0, perguntas.length)
	let respCorreta = getRandomInt (1, 4)
	let htmlPergunta = `<h2>${perguntas[random]}</h2>`

	function perguntaModelo1 () {
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	function perguntaModelo2 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMus[randomMusic].artUrl}&mus=${artMus[randomMusic].musDesc}&key=${key}`

		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				questions.innerHTML += `<option value="respCorreta">${artMus[randomMusic].musDesc}</option>`
			} else {
				questions.innerHTML += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].musDesc}</option>`
			}
		}
		questions.innerHTML += `</select>`
	}

	function perguntaModelo3 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://api.vagalume.com.br/search.php?art=${artMus[randomMusic].artUrl}&mus=${artMus[randomMusic].musDesc}&key=${key}`

		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				questions.innerHTML += `<option value="respCorreta">${artMus[randomMusic].artDesc}</option>`
			} else {
				questions.innerHTML += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].artDesc}</option>`
			}
		}
		questions.innerHTML += `</select>`
	}

	function perguntaModelo4 () {
		let randomMusic = getRandomInt(0,artMus.length)
		let urlLetra = `https://www.vagalume.com.br/${artMus[randomMusic].artUrl}/index.js`

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
		questions.innerHTML += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				questions.innerHTML += `<option value="respCorreta">${artMus[randomMusic].artDesc}</option>`
			} else {
				questions.innerHTML += `<option value="respErrada">${artMus[getRandomInt(0,artMus.length)].artDesc}</option>`
			}
		}
		questions.innerHTML += `</select>`
	}

	function perguntaModelo5 () {
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += '<p> Não fiz o codigo ainda</p>'
	}

	function perguntaModelo6 () {
		let artMusFilter = filtroArtista(artMus)
		console.log (artMusFilter)
		let randomMusic = getRandomInt(0,artMusFilter.length)
		let urlLetra = artMusFilter[randomMusic]

		parametroPergunta.innerHTML = ''
		fetch(urlLetra)
						 .then(resposta => resposta.json())
						 .then(json => {
							 let letra = json.mus[0].text
							 parametroPergunta.innerHTML += `<p>${letra}</p>`
						 })
		questions.innerHTML = ''
		questions.innerHTML += htmlPergunta
		questions.innerHTML += `<select id = "opcoesResp">`
		for (i = 1; i <= 4; i++) {
			if (i===respCorreta) {
				questions.innerHTML += `<option value="respCorreta">${artMusFilter[randomMusic].musDesc}</option>`
			} else {
				questions.innerHTML += `<option value="respErrada">${artMusFilter[getRandomInt(0,artMusFilter.length)].musDesc}</option>`
			}
		}
		questions.innerHTML += `</select>`
	}

	if (artist.value === 'vazio') {
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

//função para gerar o quiz
//função para acumular os pontos


//ACOMPANHAMENTO DOS EVENTOS DA PÁGINA

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => achaArt(genero.value))

// Botao utilizado para simular o inicio do jogo, onde abrira o pop-up para iniciar as perguntas
botaoIniciar.addEventListener('click', () => {

	//if (filtroArtista (artMus) === undefined)
		//console.log ('teste')
	// Utilizado para testar o retorno da funcao
	//let teste = filtroArtista(artMus)
	//for (i = 0; i < teste.length; i++)
		//console.log(teste[i])
	geraPerguntas(perguntas)
})

//-----------------JAVASCRIPT DO jquery ---------------------------

//js do poupup
$(function(){

var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

  $('a[data-modal-id]').click(function(e) {
    e.preventDefault();
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(500, 0.7);
    //$(".js-modalbox").fadeIn(500);
    var modalBox = $(this).attr('data-modal-id');
    $('#'+modalBox).fadeIn($(this).data());
  });


$(".js-modal-close, .modal-overlay").click(function() {
  $(".modal-box, .modal-overlay").fadeOut(500, function() {
    $(".modal-overlay").remove();
		location.reload();
  });
});

$(".js-modal-proxima").click(function() {
	geraPerguntas(perguntas)
});

$(window).resize(function() {
  $(".modal-box").css({
    top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
    left: ($(window).width() - $(".modal-box").outerWidth()) / 2
  });
});

$(window).resize();

});

//-----------jquery progressbar--------------------------


//----------------fim do js do JQUERY-------------------------------
