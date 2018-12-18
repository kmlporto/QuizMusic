Array.prototype.uniq = function () {
	let uniq = []
	let values = this
	values.forEach(function (v) {
		if (!uniq.includes(v))
			uniq.push(v)
	})
	return uniq
}

/*Funcao utilizada para diminuir a quantidade de dados do JSON
Retorno: json menor, com apenas dois dados
Parametro: json completo, com todas as informacoes da playslist
*/
export function diminJSON(itensPlaylist) {
	const diminVar = item => {
		let art = {
			artUrl: item.artUrl,
			musDesc: item.musDesc,
			artDesc: item.artDesc
		}
		return art
	}
	if (itensPlaylist !== undefined)
		return itensPlaylist.map(diminVar)
}

//função para mandar a resposta anterior para pegar artistas daquele genero no json do vagalume via url

export async function achaArtistaPorGenero(resp_gen, seletor) {
	let url = `https://www.vagalume.com.br/browse/style/${resp_gen}.js`
	const itemArt = i => `<option value="${i.artDesc.descr_url}">${i.artDesc.descr}</option>`
	const result = (item) => {
		seletor.insertAdjacentHTML('beforeend', item.playlist.map(itemArt).sort().uniq().join(''))
		console.log(item.playlist);
				
		return diminJSON(item.playlist)
	}
	return await fetch(url)
		.then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
		.then(result) //aqui vai oq vc faz com a resposta definitiva	 
}