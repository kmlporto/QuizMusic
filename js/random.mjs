/*Função para gerar a selecao aleatória das perguntas
(Funcao floor faz com que o numero seja arredondado pra baixo)*/
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
