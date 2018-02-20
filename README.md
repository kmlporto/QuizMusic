# Projeto LS (Quiz de Música)

Projeto de Linguagem de Script.

# Guia do Código

## Variáveis

### "artMus"

  Variável que contém um JSON com dados sobre o nome do artista e da música.

  Keys:

  * artUrl: Nome do artista conforme deve ser colocado no link;
  * musDesc: Nome da música.

### 'Key'

  Variável que contém a key da API.

## Funções

### 'diminJSON()'

  Funcao utilizada para diminuir a quantidade de dados do JSON.

  Observações:

  * Retorno: json menor, com apenas dois dados;
  * Parametro: json completo, com todas as informacoes da playslist.

### 'diminJSON(itensPlaylist)'

  Funcao utilizada para diminuir a quantidade de dados do JSON.

  Observações:

  * Retorno: json menor, com apenas dois dados;
  * Parametro: json completo, com todas as informacoes da playslist.

### 'filtroArtista(artistas)'

  Funcao utilizada para filtrar as musicas por artista.

  Retorno:

  * Artista vazio - Ele envia o array com as todos os links de letras de musicas de todos os artistas disponivel na playlist;

  * Artista escolhido - Ele envia o array de links de letras de musicas do
  artista escolhido.

  Parâmetros:
  	* artistas - recebe um array com todos os artistas e músicas com as
     variaveis reduzidas pela funcao diminJSON().

### getRandomInt(min, max)

  Função para gerar a selecao aleatória das perguntas.
  (Funcao floor faz com que o numero seja arredondado para o menor número
   inteiro mais próximo)
  (Funcao Random faz com que o numero seja carregado aleatoriamente)

  Parâmetros:

  * min - Menor número possível para seleção;
  * max - Maior número possível para seleção;

  Retorno:

  * Número inteiro aleatório.
