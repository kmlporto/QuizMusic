Array.prototype.uniq = function () {
	let uniq = []
	let values = this
	values.forEach(function (v) {
  	if (!uniq.includes(v))
  	uniq.push(v)
	})
  	return uniq
}

let perguntas = ['A letra , pertence a qual Artista/Banda?',
                 'Complete a letra ',
                 'Acerte a nome da música',
                 'Qual o Artista/Banda ilustrado na foto?']

var genero = document.querySelector('#generoMusical')
var artist = document.querySelector('#art-banda')
var numPer = document.querySelector('#numPer')
var questions = document.querySelector('.perguntas')
var botaoIniciar = document.querySelector('.botao')
// Variavel pra pegar o nome das musicas e artistas da funcao achaArt
var artistas = {}
// Variavel para receber a filtragem do json 'artistas', contendo apenas msc de um artista
var artistaFiltro = []
// Chave do vagalume
var key = 'c3f6644637dc1802b86c528e33ba0f78'

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => achaArt(genero.value))

//função para mandar a resposta anterior para pegar artistas daquele genero no json do vagalume via url
function achaArt(resp_gen){
	let url = `https://www.vagalume.com.br/browse/style/${resp_gen}.js`

  const itemArt = i => `<option value="${i.artUrl}">${i.artDesc}</option>`
  const result = (item) => {
		artistas = item.playlist
    artist.innerHTML = item.playlist.map(itemArt).sort().uniq().join('')
  }
  fetch(url)
	         .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	         .then(result) //aqui vai oq vc faz com a resposta definitiva
}

// Utilizo pra executar a filtragem de musicas por artistas e usá-las nas perguntas
artist.addEventListener('click', () =>{
	teste = []
	for (i = 0; i < artistas.length; i++) {
		if(artist.value === artistas[i].artUrl)
			teste.push(artistas[i])
	}
	artistaFiltro = teste
	console.log(artistaFiltro[0].musDesc)
})

// Botao utilizado para simular o inicio do jogo, onde abrira o pop-up para iniciar as perguntas
botaoIniciar.addEventListener('click', () => {
	geraPerguntas(perguntas, numPer.value, artistaFiltro)
})

/*evento para pegar a qnt de questoes a ser respondida (Achei redundante)
numPer.addEventListener('change', () => {
  console.log(numPer.value)
	geraPerguntas(perguntas, numPer.value)
})*/

/*Função para gerar a selecao aleatória das perguntas
(Funcao floor faz com que o numero seja arredondado pra baixo)*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//função para gerar perguntas
function geraPerguntas (perguntas, qtd, art) {
	//Aqui utilizei o valor [0] para agilizar o processo, mas isso tbm vira de forma 'ramdomica'
	url = `https://api.vagalume.com.br/search.php?art=${art[0].artUrl}&mus=${art[0].musDesc}&apikey=${key}`
	console.log(url)
	const result = (item) => {
    console.log(item.mus[0].text)
  }
	fetch(url)
					 .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
					 .then(result)
  questions.innerHTML = ''
  for (i = 0; i < qtd; i++)
    questions.innerHTML += `<h2>${perguntas[getRandomInt(0, perguntas.length)]}</h2>`
}


//função para gerar o quiz
//função para acumular os pontos
