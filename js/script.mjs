// Importações

import {mostraGeneros, mostraNumPerguntas} from './show-selects.mjs'
import {achaArt} from './genero.mjs'
import {geraPerguntas} from './perguntas.mjs'

//DECLARACAO DE VARIÁVEIS

var generos = ["vazio", "axe", "forro", "funk-carioca", "hip-hop", "indie",
 							"infantil", "pagode", "pop", "reggae", "rock", "samba", "sertanejo"]

var numeroPerguntas = [5, 10, 15, 20]

let perguntas = ['Complete a letra ',
                 'Acerte a nome da música',
								 'A letra , pertence a qual Artista/Banda?',
                 'Qual o Artista/Banda ilustrado na foto?']

// Query Selectors

var genero = document.querySelector('#generoMusical')
var artist = document.querySelector('#art-banda')
var numPer = document.querySelector('#numPer')
var parametroPergunta = document.querySelector ('.parametroPergunta')
var questions = document.querySelector('.perguntas')
var botaoIniciar = document.querySelector('.botao')

// Variavel pra pegar o nome das musicas e artistas nas funcoes

var artMus = []

// Chave do vagalume

var key = 'c3f6644637dc1802b86c528e33ba0f78'

// Exibição dinâmica dos itens dos selects formulário

mostraGeneros(generos, generoMusical)
mostraNumPerguntas(numeroPerguntas, numPer)

//função para acumular os pontos


//ACOMPANHAMENTO DOS EVENTOS DA PÁGINA

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => artMus = achaArt(genero.value, artist))

// Botao utilizado para simular o inicio do jogo, onde abrira o pop-up para iniciar as perguntas
botaoIniciar.addEventListener('click', (event) => {
	event.preventDefault()
	//if (filtroArtista (artMus) === undefined)
		//console.log ('teste')
	// Utilizado para testar o retorno da funcao
	//let teste = filtroArtista(artMus)
	//for (i = 0; i < teste.length; i++)
		//console.log(teste[i])
	geraPerguntas(perguntas, questions, parametroPergunta)
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
		location.reload();
  });
});

$(".js-modal-proxima").click(function() {
	geraPerguntas(perguntas, questions, parametroPergunta)
});

$(window).resize(function() {
  $(".modal-box").css({
    top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
    left: ($(window).width() - $(".modal-box").outerWidth()) / 2
  });
});

$(window).resize();

});

//-----------jquery progressbar--------------------------


//----------------fim do js do JQUERY-------------------------------
