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

let perguntas = ['A letra , pertence a qual Artista/Banda?',
                 'Complete a letra ',
                 'Acerte a nome da música',
                 'Qual o Artista/Banda ilustrado na foto?']

var genero = document.querySelector('#generoMusical')
var artist = document.querySelector('#art-banda')
var numPer = document.querySelector('#numPer')
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
			musDesc: item.musDesc
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

/*funcao para requisicao do JSON da API do vagalume
	-Parametros: vetor com os artistas (ou apenas 1) que irão participar do jogo
	-Retorno: irá retornar um JSON com as seguintes condições:
	 	-se o vetor tiver apenas 1 artista - JSON com apenas musicas
		-se o vetor tiveer varios artistas - JSON completo com nome do artista, foto e musicas;*/
/*function requisicaoJSON (parametroArtista) {
	let urlteste = ''
	let parametro1 = ['madonna']
	let parametro2 = ['madonna','lady%20gaga','justin%20bieber','maroon%205','michael%20jackson']
	//urlteste = `https://api.vagalume.com.br/search.php?art=${parametro1[0]}&apikey=${key}`

	/*funcao para requisiscao de informacoes sobre o artista as melhores musicas do artista
		- parametro: nome do artistas
		- retorno: array de objetos com id, desc e url da musica*/
	/*function requisicaoTopMusicasArtista (artista) {
		let urlArtista = `https://www.vagalume.com.br/${artista}/index.js`

		fetch(urlArtista)
		  .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
			.then(json => {
			arrayMusicas = json.artist.toplyrics
		})
	}

	if (parametro1.length === 1) {
	}else {

	}
}*/

//função para gerar perguntas
function geraPerguntas (perguntas, qtd, art) {
	//Aqui utilizei o valor [0] para agilizar o processo, mas isso tbm vira de forma 'ramdomica'
	url = `https://api.vagalume.com.br/search.php?art=${art[0].artUrl}&mus=${art[0].musDesc}&apikey=${key}`
	//console.log(url)
	//const result = (item) => {
    //console.log(item.mus[0].text)
  //}
	//fetch(url)
		//			 .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
			//		 .then(result)

	questions.innerHTML = ''
	if (art === 0) {
		for (i = 0; i < qtd; i++) {
			let randomResult = getRandomInt(0, perguntas.length)
			questions.innerHTML += `<h2>${perguntas[randomResult]}</h2>`
			if (randomResult === 0) {

				fetch (url)
				questions.innerHTML += ``
			}
		}
	}
}


//função para gerar o quiz
//função para acumular os pontos


//ACOMPANHAMENTO DOS EVENTOS DA PÁGINA

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => achaArt(genero.value))

// Botao utilizado para simular o inicio do jogo, onde abrira o pop-up para iniciar as perguntas
botaoIniciar.addEventListener('click', () => {

	if (filtroArtista (artMus) === undefined)
		console.log ('teste')
	// Utilizado para testar o retorno da funcao
	let teste = filtroArtista(artMus)
	for (i = 0; i < teste.length; i++)
		console.log(teste[i])
	//geraPerguntas(perguntas, numPer.value, filtroArtista(artistas))
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
  });
});

$(window).resize(function() {
  $(".modal-box").css({
    top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
    left: ($(window).width() - $(".modal-box").outerWidth()) / 2
  });
});

$(window).resize();

});


//----------------fim do js do JQUERY-------------------------------
