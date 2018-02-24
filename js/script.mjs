// Importações

// import 'jquery.countdown';
import 'jquery'
import 'bootstrap'
import 'popper.js'
import {mostraGeneros, mostraNumPerguntas} from './show-selects.mjs'
import {achaArt} from './genero.mjs'
import {geraPerguntas} from './perguntas.mjs'
// import './jquery.countdown.js'

//DECLARACAO DE VARIÁVEIS

const generos = ["vazio", "axe", "forro", "funk-carioca", "hip-hop", "indie",
 							"infantil", "pagode", "pop", "reggae", "rock", "samba", "sertanejo"]

const numeroPerguntas = [5, 10, 15]

const perguntas = ['Complete a letra ',
                 'Acerte a nome da música',
								 'A letra , pertence a qual Artista/Banda?',
                 'Qual o Artista/Banda ilustrado na foto?']

// Query Selectors

const genero = document.querySelector('#generoMusical')
const artist = document.querySelector('#art-banda')
const numPer = document.querySelector('#numPer')
var botaoIniciar = document.querySelector('.botao')

// Variavel pra pegar o nome das musicas e artistas nas funcoes

var artMus = []
var contadorPerguntas = 0;
var pontos = 0
var stringGameOver = "Game over! TOTAL DE PONTOS:"

// Chave do vagalume

var key = 'c3f6644637dc1802b86c528e33ba0f78'

// Exibição dinâmica dos itens dos selects formulário

mostraGeneros(generos, generoMusical)
mostraNumPerguntas(numeroPerguntas, numPer)

//função para acumular os pontos


//funcao para trocar as geraPerguntas

function trocaPerguntas () {
  var parametroPergunta = document.querySelector ('.parametroPergunta')
  var questions = document.querySelector('.perguntas')

  timerCount();
  geraPerguntas(perguntas, questions, parametroPergunta, artist.value, artMus, key)
  contadorPerguntas++;
  $('#modal').iziModal('open');
}

//funcao para computar a resposta e finalizar o Jogo
function verificaResposta () {
  var respostaRadio = document.querySelector('input[name="optradio"]:checked')

  if (respostaRadio) {
    if(respostaRadio.value === 'respCorreta') {
      pontos++
      alert("Você é o cara! Resposta correta, continue assim")
    }else {
    alert("Não foi dessa vez parceiro! Resposta errada")
    }
  }
}

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
  trocaPerguntas()
})

$(document).on('closed', '#modal', function (e) {
    if (contadorPerguntas != numPer.value) {
      verificaResposta()
      trocaPerguntas ()
    }else {
      stringGameOver += pontos
      alert(stringGameOver);
      location.reload();
    }
});


$(document).on('fullscreen', '#modal', function (e) {
  location.reload();
});

//-----------------jquery dos plugins ---------------------------

//tempo restante
function timerCount () {
	// adaptado de - http://hilios.github.io/jQuery.countdown/
	var date = new Date();
	var seg = date.getSeconds()
	date = date.setSeconds(seg+60);
	$("#clock").countdown(date, function(event) {
		$(this).html(
			event.strftime('%S')
		);
	})
		.on('finish.countdown',function(event) {
			$(this).html('Tempo limite atingido!');
			location.reload();
		});
}

//js do poupup

$("#modal").iziModal({
    title: '',
    subtitle: '',
    headerColor: '#88A0B9',
    background: null,
    theme: '',  // light
    icon: null,
    iconText: null,
    iconColor: '',
    rtl: false,
    width: 600,
    top: null,
    bottom: null,
    borderBottom: true,
    padding: 0,
    radius: 3,
    zindex: 999,
    iframe: false,
    iframeHeight: 400,
    iframeURL: null,
    focusInput: true,
    group: '',
    loop: false,
    arrowKeys: true,
    navigateCaption: true,
    navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
    history: false,
    restoreDefaultContent: false,
    autoOpen: 0, // Boolean, Number
    bodyOverflow: false,
    fullscreen: false,
    openFullscreen: true,
    closeOnEscape: true,
    closeButton: true,
    appendTo: 'body', // or false
    appendToOverlay: 'body', // or false
    overlay: true,
    overlayClose: true,
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    timeout: false,
    timeoutProgressbar: false,
    pauseOnHover: false,
    timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
    transitionIn: 'comingIn',
    transitionOut: 'comingOut',
    transitionInOverlay: 'fadeIn',
    transitionOutOverlay: 'fadeOut',
    onFullscreen: function(){},
    onResize: function(){},
    onOpening: function(){},
    onOpened: function(){},
    onClosing: function(){},
    onClosed: function(){},
    afterRender: function(){}
});

//----------------fim JQUERY dos puglins-------------------------------
