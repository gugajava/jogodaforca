document.addEventListener("DOMContentLoaded", function () {
  const palavrasFaltando = [
    { palavra: "iniciado", posicao: 1 },
    { palavra: "desenvolver", posicao: 2 },
    { palavra: "neurocirúrgico", posicao: 3 },
    { palavra: "degenerativas", posicao: 4 },
    { palavra: "Alzheimer", posicao: 5 },
    { palavra: "Parkinson", posicao: 6 },
    { palavra: "precoce", posicao: 7 },
    { palavra: "filamentos", posicao: 8 },
    { palavra: "nanoestruturados", posicao: 9 },
    { palavra: "bioimpulsos", posicao: 10 },
    { palavra: "reprogramar", posicao: 11 },
    { palavra: "Arkham", posicao: 12 },
    { palavra: "Manutenção", posicao: 13 },
    { palavra: "oculto", posicao: 14 },
    { palavra: "milhões", posicao: 15 },
    { palavra: "aprovação", posicao: 16 },
    { palavra: "Comitê", posicao: 17 },
    { palavra: "Bioética", posicao: 18 },
    { palavra: "Craniotomias", posicao: 19 },
    { palavra: "anestesia", posicao: 20 },
    { palavra: "filamentos", posicao: 21 },
    { palavra: "malha", posicao: 22 },
    { palavra: "polimérico", posicao: 23 },
    { palavra: "bateria", posicao: 24 },
    { palavra: "reversão", posicao: 25 },
    { palavra: "controlados", posicao: 26 },
    { palavra: "emocional", posicao: 27 },
    { palavra: "memórias", posicao: 28 },
    { palavra: "óbitos", posicao: 29 },
    { palavra: "catatônico", posicao: 30 },
    { palavra: "cognitiva", posicao: 31 },
    { palavra: "automutilação", posicao: 32 },
    { palavra: "agressividade", posicao: 33 },
    { palavra: "suicídio", posicao: 34 },
  ];

  const textoOriginal = `O Projeto Éden Cortical foi '__1__' com o objetivo declarado de '__2__' um protocolo '__3__' avançado para tratar condições '__4__' do sistema nervoso central, tais como '__5__', Mal de '__6__', Síndrome de Huntington e demência '__7__'. A proposta envolvia a inserção de '__8__' '__9__' diretamente nos lobos frontais, em conjunto com uma rede de '__10__' externos, para mapear, estimular e '__11__' circuitos neurais deteriorados. LOCAL: Instalação subterrânea anexa ao Asilo '__12__' – Ala Leste (registro falso: '__13__' Técnica – Escoamento”) Financiamento: Fundo '__14__' – Fundação Wayne para Doenças Raras (desviado 6,2 '__15__' em 18 meses) Status legal: Sem '__16__' de órgãos reguladores. Nenhuma submissão ao '__17__' de '__18__' de Gotham ou à FDA. Procedimentos aplicados: '__19__' realizadas sem '__20__' adequada em pelo menos 9 casos. Inserção de “ '__21__' vivos” (protótipos WayneBio-β) nos lobos frontais, acoplados a uma '__22__' de cobre '__23__' ligada a uma '__24__' neural externa (sem protocolos de '__25__'). Indução de surtos elétricos '__26__' para testar --resposta '__27__'-- e capacidade de formar novas '__28__'. Resultados parciais: 5 '__29__' nas primeiras 48 horas pós-cirurgia. 2 sujeitos entraram em estado '__30__' permanente. 1 sujeito (ID: A-013) demonstrou aumento temporário de função '__31__' e habilidades de cálculo, mas apresentou colapso total após 96h, seguido de convulsões e morte. Vários casos de '__32__', '__33__' extrema e '__34__' durante fase de teste.`;

  let texto = textoOriginal;
  palavrasFaltando.forEach((p) => {
    const regex = new RegExp(`__${p.posicao}__`, "g");
    texto = texto.replace(regex, `_____${p.posicao}_____`);
  });
  
document.getElementById("texto").innerText = texto;

const words = palavrasFaltando.map(p => p.palavra.toUpperCase());
const hangmanStages = [
  ` _______ 
|       |
|       
|       
| _|_     `,
  ` _______ 
|       |
|   O   |
|       
| _|_     `,
  ` _______ 
|       |
|   O   |
|   |   |
| _|_     `,
  ` _______ 
|       |
|   O   |
|  /|   |
| _|_     `,
  ` _______ 
|       |
|   O   |
|  /|\\  |
| _|_     `,
  ` _______ 
|       |
|   O   |
|  /|\\  |
|  /    _|_     `,
  ` _______ 
|       |
|   O   |
|  /|\\  |
|  / \\  _|_     `
];

let selectedWord = "";
let guessedLetters = [];
let attemptsLeft = 6;
const wordDisplay = document.getElementById("wordDisplay");
const lettersContainer = document.getElementById("letters");
const message = document.getElementById("message");
const hangmanPre = document.getElementById("hangman");
const newGameBtn = document.getElementById("newGame");

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attemptsLeft = 6;
  updateDisplay();
  drawLetters();
  message.textContent = "";
  updateHangman();
}

function updateDisplay() {
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");
}

function drawLetters() {
  lettersContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.disabled = guessedLetters.includes(btn.textContent);
    btn.addEventListener("click", handleGuess);
    lettersContainer.appendChild(btn);
  }
}

function handleGuess(event) {
  const letter = event.target.textContent;
  guessedLetters.push(letter);
  event.target.disabled = true;
  if (selectedWord.includes(letter)) {
    updateDisplay();
    checkWin();
  } else {
    attemptsLeft--;
    triggerGlitch();
    updateHangman();
    checkLose();
  }
}

function updateHangman() {
  hangmanPre.textContent = hangmanStages[6 - attemptsLeft];
}

function checkWin() {
  const wordGuessed = selectedWord.split("").every(letter => guessedLetters.includes(letter));
  if (wordGuessed) {
    message.textContent = "Você venceu!";
    updateTexto(selectedWord);
    disableAll();
  }
}

function checkLose() {
  if (attemptsLeft <= 0) {
    message.textContent = `Você perdeu! A palavra era: ${selectedWord}`;
    disableAll();
  }
}

function triggerGlitch() {
  const container = document.getElementById("glitch-container");
  if (container) {
    container.classList.add("glitch-effect");
    setTimeout(() => {
      container.classList.remove("glitch-effect");
    }, 2000);
  }
}

function disableAll() {
  const buttons = lettersContainer.querySelectorAll("button");
  buttons.forEach(button => button.disabled = true);
}

function updateTexto(palavraDescoberta) {
  const palavra = palavrasFaltando.find(p => p.palavra.toUpperCase() === palavraDescoberta);
  if (palavra) {
    const marcador = `_____${palavra.posicao}_____`;
    texto = texto.replace(marcador, palavra.palavra);
    document.getElementById("texto").innerText = texto;
  }
}

newGameBtn.addEventListener("click", startGame);
startGame();
});