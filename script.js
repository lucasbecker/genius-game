const blue = document.querySelector('.blue');      // 3 == blue
const red = document.querySelector('.red');        // 1 == red
const green = document.querySelector('.green');    // 0 == green
const yellow = document.querySelector('.yellow');  // 2 == yellow

let order = [];
let clickedOrder = [];
let score = 0;

// Cria ordem
function shuffleOrder(){
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];
  
  for(let i in order){
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

// Acende as teclas
function lightColor(element, number){
  number = number * 500;
  element.classList.remove('selected');

  setTimeout(() => {
    element.classList.add('selected');
  }, number - 300);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number - 100)
}

// Confere acertos
function checkOrder(){
  // Se errar
  for(let i in clickedOrder){
    if(clickedOrder[i] != order[i]){
      gameOver();
      break;
    }
  }
  // Se acertar
  if(clickedOrder.length == order.length){
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
}

// Cliques do usuário
function click(color){
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(()=> createColorElement(color).classList.remove('selected'), 200)
  setTimeout(() => checkOrder(), 300)
}

// Retorna a cor
function createColorElement(color){
  switch(color){
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
    default:
      break;
  }
}

// Criar nova fase
function nextLevel(){
  score++; 
  shuffleOrder();
}

// Fim de jogo
function gameOver(){
  alert(`GAME OVER!\nSua pontuação total: ${score}\n\nClique em OK para recomeçar!`)
  order = [];
  clickedOrder = [];

  startGame();
}

// Começar o jogo
function startGame(){
  alert(`Bem-vindo ao Genius!\nIniciando novo jogo...`);
  score = 0;

  nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

startGame();