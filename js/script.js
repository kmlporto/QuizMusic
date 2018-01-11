Array.prototype.uniq = function () {	
  	let uniq = []
  	let values = this
  	values.forEach(function (v) {
		if (!uniq.includes(v)) 
		uniq.push(v)
	})
  	return uniq
}
  
  

genero = document.querySelector('#generoMusical')
artist = document.querySelector('#art-banda')
numPer = document.querySelector('#numPer')

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', function(){
	let resp_gen = genero.value
	achaArt(resp_gen)
})

//função para mandar a resposta anterior para pegar artistas daquele genero no json do vagalume via url
function achaArt(resp_gen){
	let url = `https://www.vagalume.com.br/browse/style/${resp_gen}.js`
	
	fetch(url)
	.then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	.then( function(data){ //aqui vai oq vc faz com a resposta definitiva
		let art = data.playlist.map(item=> `<option value="${item.artUrl}">${item.artDesc}</option>`).sort().uniq().join('')
		artist.innerHTML = art
  })	
}

let qnt
//evento para pegar a qnt de questoes a ser respondida
numPer.addEventListener('change', function(){
	qnt = numPer.value
})

//função para gerar perguntas
//função para gerar o quiz
//função para acumular os pontos
