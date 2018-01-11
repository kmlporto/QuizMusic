Array.prototype.uniq = function () {
  	let uniq = []
  	let values = this
  	values.forEach(function (v) {
		if (!uniq.includes(v))
		uniq.push(v)
	})
  	return uniq
}

var genero = document.querySelector('#generoMusical')
var artist = document.querySelector('#art-banda')
var numPer = document.querySelector('#numPer')

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', gen => achaArt(genero.value))

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

let qnt
//evento para pegar a qnt de questoes a ser respondida
numPer.addEventListener('change', num => qtd = num.value)

//função para gerar perguntas
//função para gerar o quiz
//função para acumular os pontos
