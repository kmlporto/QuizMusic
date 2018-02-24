// Importações

// import 'jquery.countdown';
// import 'jquery'
// import 'bootstrap'
// import 'popper.js'
import {mostraGeneros, mostraNumPerguntas} from './show-selects.mjs'
import {achaArt} from './genero.mjs'
import {geraPerguntas, exibePergunta} from './perguntas.mjs'
// import './jquery.countdown.js'

//DECLARACAO DE VARIÁVEIS
// Query Selectors

var genero = document.querySelector('#generoMusical')
var numeroPerguntas = document.querySelector('#numPer')
var artist = document.querySelector('#art-banda')
var botaoIniciar = document.querySelector('.botao')
var popup = document.querySelector ('.corpo-popup')

var arrayPerguntas = []

// Variavel pra pegar o nome das musicas e artistas nas funcoes
var artMus = []
var posicaoPergunta = 0

// Exibição dinâmica dos itens dos selects formulário

mostraGeneros(genero)
mostraNumPerguntas(numeroPerguntas)

//ACOMPANHAMENTO DOS EVENTOS DA PÁGINA

//evento para receber o valor da escolha do genero musical
genero.addEventListener('change', () => {
  artist.innerHTML = ''
  artist.innerHTML = `<option value="vazio">Escolha um Artista/banda (opcional)</option>`
  artMus = achaArt(genero.value, artist)
})

// Botao utilizado para simular o inicio do jogo, onde abrira o pop-up para iniciar as perguntas
botaoIniciar.addEventListener('click', (event) => {
	event.preventDefault()
  timerCount();
	arrayPerguntas = geraPerguntas (artMus, artist.value, numeroPerguntas.value)
  console.log(arrayPerguntas);
  posicaoPergunta = exibePergunta(arrayPerguntas, posicaoPergunta, popup)
})

//-----------------JAVASCRIPT DO jquery ---------------------------

//tempo restante
function timerCount () {
	// adaptado de - http://hilios.github.io/jQuery.countdown/
	var date = new Date();
	var seg = date.getSeconds()
	date = date.setSeconds(seg+60);
	$("#clock").countdown(date, function(event) {
		$(this).html(
			event.strftime('CONTAGEM REGRESSIVA PARA RESPOSTA: %S')
		);
	})
		.on('finish.countdown',function(event) {
			$(this).html('Tempo limite atingido!');
			location.reload();
		});
}

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
	timerCount()
  posicaoPergunta = exibePergunta(arrayPerguntas, posicaoPergunta, popup)
  if ((posicaoPergunta + 1) === numeroPerguntas.value)
    $(".modal-overlay").remove();
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
