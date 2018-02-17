export function mostraGeneros (seletor) {
  var generos = ["vazio", "axe", "forro", "funk-carioca", "hip-hop", "indie",
   							"infantil", "pagode", "pop", "reggae", "rock", "samba", "sertanejo"]
	let geraTagHtml = genero => {
		let result
		if (genero != 'vazio') {
			result = `<option value="${genero}">${genero.toUpperCase().replace('-', ' ')}</option>`
		}	else
				result = `<option value="${genero}">Escolha um Gênero (Obrigatório)</option>`
		seletor.insertAdjacentHTML('beforeend',result)
	}
	generos.forEach(geraTagHtml)
}

export function mostraNumPerguntas (seletor) {
  var numeroPerguntas = [5, 10, 15, 20]
	console.log(numeros)
	let geraTagHtml = numero => {
		seletor.insertAdjacentHTML('beforeend',`<option value="${numero}">${numero}</option>`)
	}
	numeros.forEach(geraTagHtml)
}

// modules.exports = {
//   mostraGeneros,
//   mostraNumPerguntas
// }
