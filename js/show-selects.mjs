export function mostraGeneros (generos, seletor) {
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

export function mostraNumPerguntas (numeros, seletor) {
	console.log(numeros)
	let geraTagHtml = numero => {
		seletor.insertAdjacentHTML('beforeend',`<option value="${numero}">${numero}</option>`)
	}
	numeros.forEach(geraTagHtml)
}
