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

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => achaArt(genero.value))

//função para mandar a resposta anterior para pegar artistas daquele genero no json do vagalume via url
function achaArt(resp_gen){
	let url = `https://www.vagalume.com.br/browse/style/${resp_gen}.js`

  const itemArt = i => `<option value="${i.artUrl}">${i.artDesc}</option>`
  const result = (item) => {
    artist.innerHTML = item.playlist.map(itemArt).sort().uniq().join('')
  }
  fetch(url)
	         .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	         .then(result) //aqui vai oq vc faz com a resposta definitiva
}

//evento para pegar a qnt de questoes a ser respondida
numPer.addEventListener('change', () => {
  geraPerguntas(perguntas, numPer.value)
})

//Função para gerar a selecao aleatória das perguntas
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//função para gerar perguntas
function geraPerguntas (perguntas, qtd) {
  questions.innerHTML = ''
  for (i = 0; i < qtd; i++)
    questions.innerHTML += `<h2>${perguntas[getRandomInt(0, perguntas.length)]}</h2>`
}
//console.log(geraPerguntas(perguntas));


//função para gerar o quiz
//função para acumular os pontos
