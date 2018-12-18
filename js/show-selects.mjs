export function mostraGeneros (seletor) {
	let generos = ["vazio", "axe", "forro", "funk-carioca", "hip-hop", "indie",
	 							"infantil", "pagode", "pop", "reggae", "rock", "samba", "sertanejo"]
	let geraTagHtml = genero => {
		let result
		if (genero != 'vazio')
			result = `<option value="${genero}">${genero.toUpperCase().replace('-', ' ')}</option>`
		else
			result = `<option value="${genero}">Escolha um Gênero (Obrigatório)</option>`
		seletor.insertAdjacentHTML('beforeend',result)
	}
	generos.forEach(geraTagHtml)
}

export function mostraNumPerguntas (seletor) {
	var numeroPerguntas = [
		{
			display: 'Fácil',
			resposta: 5
		},
		{
			display: 'Intermediário',
			resposta: 10
		},
		{
			display: 'Difícil',
			resposta: 15
		}
	]
	let geraTagHtml = numero => {
		let html = `<option value="${numero.resposta}">${numero.display}</option>`
		seletor.insertAdjacentHTML('beforeend',html)
	}
	numeroPerguntas.forEach(geraTagHtml)
}
