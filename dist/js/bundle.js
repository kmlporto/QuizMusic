!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(6)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=n(3),r=n(4),i=document.querySelector("#generoMusical"),s=document.querySelector("#numPer"),c=document.querySelector("#art-banda"),l=document.querySelector(".botao"),u=[],p=0,d=0,f="Game over! TOTAL DE PONTOS:";function h(){var t,e,n=document.querySelector(".corpo-popup");t=new Date,e=t.getSeconds(),t=t.setSeconds(e+30),$("#clock").countdown(t,function(t){$(this).html(t.strftime("TIME: %S"))}).on("finish.countdown",function(t){$(this).html("Tempo limite atingido!"),location.reload()}),async function(t,e){e.innerHTML="",console.log("Posicao dentro da funcao "+p),console.log(t),t.then(t=>{console.log("Posicao dentro do then "+p),t[p].then(t=>{console.log(t),e.insertAdjacentHTML("afterbegin",t),p++})})}(Object(r.a)(u,c.value,s.value),n),$("#modal").iziModal("open")}Object(o.a)(i),Object(o.b)(s),i.addEventListener("change",()=>{c.innerHTML="",c.insertAdjacentHTML("afterbegin",'<option value="vazio">Escolha um Artista/banda (opcional)</option>'),u=Object(a.a)(i.value,c)}),l.addEventListener("click",t=>{t.preventDefault(),h()}),$(document).on("closed","#modal",function(t){var e;p!=numPer.value?((e=document.querySelector('input[name="optradio"]:checked'))&&("respCorreta"===e.value?(d++,alert("Você é o cara! Resposta correta, continue assim")):alert("Não foi dessa vez parceiro! Resposta errada")),h()):(alert(f+=d),location.reload())}),$(document).on("fullscreen","#modal",function(t){location.reload()}),$("#modal").iziModal({title:"",subtitle:"",headerColor:"#88A0B9",background:null,theme:"",icon:null,iconText:null,iconColor:"",rtl:!1,width:600,top:null,bottom:null,borderBottom:!0,padding:0,radius:3,zindex:999,iframe:!1,iframeHeight:400,iframeURL:null,focusInput:!0,group:"",loop:!1,arrowKeys:!0,navigateCaption:!0,navigateArrows:!0,history:!1,restoreDefaultContent:!1,autoOpen:0,bodyOverflow:!1,fullscreen:!1,openFullscreen:!0,closeOnEscape:!0,closeButton:!0,appendTo:"body",appendToOverlay:"body",overlay:!0,overlayClose:!0,overlayColor:"rgba(0, 0, 0, 0.4)",timeout:!1,timeoutProgressbar:!1,pauseOnHover:!1,timeoutProgressbarColor:"rgba(255,255,255,0.5)",transitionIn:"comingIn",transitionOut:"comingOut",transitionInOverlay:"fadeIn",transitionOutOverlay:"fadeOut",onFullscreen:function(){},onResize:function(){},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){},afterRender:function(){}})},function(t,e,n){"use strict";e.a=function(t){["vazio","axe","forro","funk-carioca","hip-hop","indie","infantil","pagode","pop","reggae","rock","samba","sertanejo"].forEach(e=>{let n;n="vazio"!=e?`<option value="${e}">${e.toUpperCase().replace("-"," ")}</option>`:`<option value="${e}">Escolha um Gênero (Obrigatório)</option>`,t.insertAdjacentHTML("beforeend",n)})},e.b=function(t){[{display:"Fácil",resposta:5},{display:"Intermediário",resposta:10},{display:"Difícil",resposta:15}].forEach(e=>{let n=`<option value="${e.resposta}">${e.display}</option>`;t.insertAdjacentHTML("beforeend",n)})}},function(t,e,n){"use strict";e.a=async function(t,e){let n=`https://www.vagalume.com.br/browse/style/${t}.js`;const o=t=>`<option value="${t.artUrl}">${t.artDesc}</option>`;return await fetch(n).then(t=>t.json()).then(t=>(e.innerHTML+=t.playlist.map(o).sort().uniq().join(""),function(t){if(void 0!==t)return t.map(t=>({artUrl:t.artUrl,musDesc:t.musDesc,artDesc:t.artDesc}))}(t.playlist)))},Array.prototype.uniq=function(){let t=[];return this.forEach(function(e){t.includes(e)||t.push(e)}),t}},function(t,e,n){"use strict";e.a=async function(t,e,n){let r=[];for(let i=1;i<=n;i++){let n=await a(t,e);if("vazio"===e)switch(Object(o.a)(1,5)){case 1:r.push(u(n));break;case 2:r.push(p(n));break;case 3:r.push(d(n));break;case 4:r.push(f(n))}else{let t=Object(o.a)(1,3);switch(t){case 1:r.push(u(n));break;case 2:r.push(f(n))}}}return r};var o=n(5);async function a(t,e){let n,o=[];return await t.then(t=>{if("vazio"!==e){for(n=0;n<t.length;n++)e===t[n].artUrl&&o.push(t[n]);return o}return t})}const r=(t,e)=>{let n=[],a=Object(o.a)(1,5);for(let t=0;t<3;t++)n.push(`<div class="radio">\n\t\t\t\t\t\t\t\t\t<input type="radio" value="respErrada" name="optradio" id="radio${t+1}">\n\t\t\t\t\t\t\t\t\t<label for="radio${t+1}">${e[t]}</label>\n\t\t\t\t\t\t\t\t</div>`);n.push(`<div class="radio">\n\t\t\t\t\t\t\t\t<input type="radio" class="respCorreta" value="respCorreta" name="optradio" id="radio4">\n\t\t\t\t\t\t\t\t<label for="radio4">${t}</label>\n\t\t\t\t\t\t\t</div>`);let r=n[a];return n[a]=n[3],n[3]=r,n.join("")},i=(t,e)=>{let n=[];for(let o=0;o<3;o++)o!==e?n.push(t[o].musDesc):n.push(t[3].musDesc);return n},s=(t,e)=>{let n=[];for(let o=0;o<3;o++)o!==e?n.push(t[o].artDesc):n.push(t[3].artDesc);return n},c=t=>t.split("\n").slice(0,5).join("<br>"),l=async function(t,e){const n=`https://api.vagalume.com.br/search.php?art=${t}&mus=${e}&key=c3f6644637dc1802b86c528e33ba0f78`;return await fetch(n).then(t=>t.json()).then(t=>t.mus[0].text)};async function u(t){const e=Object(o.a)(0,t.length),n=await l(t[e].artUrl,t[e].musDesc);let a=new RegExp("(.+? ){4}([^ ]+)");return`<div class="col">\n\t\t\t\t\t<h3>Complete a letra</h3>\n\t\t\t\t\t<p>${c(n)}</p>\n\t\t\t\t\t<h3>Digite a resposta</h3>\n\t\t\t\t\t<input type= "text" pattern= "${a}" id="completeLetra" placeholder="Digite as proximas 5 palavas">\n\t\t\t\t\t<div class="col">`}async function p(t){const e=Object(o.a)(0,t.length),n=await l(t[e].artUrl,t[e].musDesc);return`<div class="col">\n\t\t\t\t\t<h3>A letra , pertence a qual Artista/Banda?</h3>\n\t\t\t\t\t<p>${c(n)}</p>\n\t\t\t\t\t<h3>Faça a sua escolha</h3>\n\t\t\t\t\t${r(t[e].artDesc,s(t,e))}\n\t\t\t\t\t</div>`}async function d(t){const e=Object(o.a)(0,t.length),n=`https://www.vagalume.com.br/${t[e].artUrl}/index.js`;return console.log(n),`<div class="col">\n\t\t\t\t\t<h3>Qual o Artista/Banda ilustrado na foto?</h3>\n\t\t\t\t\t<img src="https://www.vagalume.com.br/${await fetch(n).then(t=>t.json()).then(t=>t.artist.pic_medium)}" alt="">\n\t\t\t\t\t<h3>Faça a sua escolha</h3>\n\t\t\t\t\t${r(t[e].artDesc,s(t,e))}\n\t\t\t\t\t</div>`}async function f(t){const e=Object(o.a)(0,t.length),n=await l(t[e].artUrl,t[e].musDesc);return`<div class="col">\n\t\t\t\t\t<h3>Acerte a nome da música</h3>\n\t\t\t\t\t<p>${c(n)}</p>\n\t\t\t\t\t<h3>Faça a sua escolha</h3>\n\t\t\t\t\t${r(t[e].musDesc,i(t,e))}\n\t\t\t\t\t</div>`}},function(t,e,n){"use strict";e.a=function(t,e){return Math.floor(Math.random()*(e-t))+t}},function(t,e,n){t.exports=n.p+"css/bundle.css"}]);