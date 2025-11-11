// Quiz sur Kelyan - JavaScript

// Variables globales
let currentPlayerName = "";

// Gestion du classement avec localStorage
function getRanking() {
  const ranking = localStorage.getItem('kelyanQuizRanking');
  return ranking ? JSON.parse(ranking) : [];
}

function saveToRanking(name, score) {
  let ranking = getRanking();
  
  // Vérifier si le joueur existe déjà
  const existingPlayer = ranking.find(player => player.name === name);
  
  if (existingPlayer) {
    // Mettre à jour seulement si le nouveau score est meilleur
    if (score > existingPlayer.score) {
      existingPlayer.score = score;
      existingPlayer.date = new Date().toLocaleDateString();
    }
  } else {
    // Ajouter nouveau joueur
    ranking.push({
      name: name,
      score: score,
      date: new Date().toLocaleDateString()
    });
  }
  
  // Trier par score décroissant
  ranking.sort((a, b) => b.score - a.score);
  
  // Garder seulement le top 10
  ranking = ranking.slice(0, 10);
  
  localStorage.setItem('kelyanQuizRanking', JSON.stringify(ranking));
}

function startQuizWithName() {
  const nameInput = document.getElementById('player-name');
  const name = nameInput.value.trim();
  
  if (name === '') {
    document.querySelector('.name-required').classList.remove('hidden');
    nameInput.focus();
    return;
  }
  
  currentPlayerName = name;
  document.querySelector('.name-required').classList.add('hidden');
  
  // Masquer l'écran d'accueil et afficher le quiz
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  document.querySelector('.score-display').classList.remove('hidden');
  
  // Commencer le quiz
  startQuiz();
}

function startQuiz() {
  // Initialiser le quiz proprement
  initQuiz();
}

function showWelcome() {
  // Réinitialiser tous les écrans
  document.getElementById('welcome-screen').classList.remove('hidden');
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('final-result').classList.add('hidden');
  document.getElementById('ranking-screen').classList.add('hidden');
  document.querySelector('.score-display').classList.add('hidden');
  
  // Réinitialiser le champ nom
  document.getElementById('player-name').value = '';
  document.querySelector('.name-required').classList.add('hidden');
}

// Variable pour mémoriser l'écran précédent
let previousScreen = 'welcome-screen';

function showRanking() {
  // Sauvegarder l'écran actuel avant de passer au classement
  if (!document.getElementById('welcome-screen').classList.contains('hidden')) {
    previousScreen = 'welcome-screen';
  } else if (!document.getElementById('quiz-container').classList.contains('hidden')) {
    previousScreen = 'quiz-container';
  } else if (!document.getElementById('final-result').classList.contains('hidden')) {
    previousScreen = 'final-result';
  }
  
  // Masquer tous les autres écrans
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('final-result').classList.add('hidden');
  
  // Afficher l'écran de classement
  document.getElementById('ranking-screen').classList.remove('hidden');
  
  displayRanking();
}

function goBackFromRanking() {
  // Masquer l'écran de classement
  document.getElementById('ranking-screen').classList.add('hidden');
  
  // Retourner à l'écran précédent
  document.getElementById(previousScreen).classList.remove('hidden');
  
  // Si on retourne au quiz, s'assurer que le score est visible
  if (previousScreen === 'quiz-container') {
    document.querySelector('.score-display').classList.remove('hidden');
  }
}

function displayRanking() {
  const ranking = getRanking();
  const rankingList = document.getElementById('ranking-list');
  
  if (ranking.length === 0) {
    rankingList.innerHTML = '<p class="no-ranking">Aucun score enregistré pour le moment ! 🤷‍♂️</p>';
    return;
  }
  
  let html = '';
  ranking.forEach((player, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    const isCurrentPlayer = player.name === currentPlayerName ? 'current-player' : '';
    
    html += `
      <div class="ranking-item ${isCurrentPlayer}">
        <span class="rank">${medal}</span>
        <span class="name">${player.name}</span>
        <span class="score">${player.score}/12</span>
        <span class="date">${player.date}</span>
      </div>
    `;
  });
  
  rankingList.innerHTML = html;
}

// Données du quiz
const quizData = [
  {
    question: "❤️ Qui a le plus marqué la vie sentimentale de Kellyanne ?",
    answers: ["Babel", "Isabelle", "Yannis", "Mariana"],
    correct: 0,
  },
  {
    question: "🏆 Quelle est la plus grande fierté de Kellyan ?",
    answers: [
      "Être majeur",
      "Porter un jean extrêmement moulant avec le drapeau de l'Amérique sur le postérieur",
      "Avoir son alternance",
    ],
    correct: 0,
  },
  {
    question: "🎭 Quel est le visage caché de Kelyan ?",
    answers: ["Un détraqué du S", "Un detraquer du s", "Un detraqueee du s"],
    correct: 0,
  },
  {
    question: "⭐ Quelle est la meilleure compétence de Kelyan ?",
    answers: ["La danse", "La politique", "Le chant", "La drague"],
    correct: 0,
  },
  {
    question: "👯 Qui est le sosie de Kelyan ?",
    answers: [
      "Jungkook des BTS",
      "Alex Hitchens le malade mental",
      "Morgane Makeup",
      "Liu",
    ],
    correct: 1,
  },
  {
    question: "😳 Quelle est la plus grosse honte de Kelyan ?",
    answers: [
      "Avoir été mineur la plus grande partie de sa vie",
      "Râteau par les femmes effrayées qu'il a accostées",
      "Le jean américain qui ressortait son BBL",
    ],
    correct: 2,
  },
  {
    question: "💭 Quel est le plus grand rêve de Kelyan ?",
    answers: [
      "La richesse",
      "Un concert en duo avec Ziak",
      "Une femelle peu importe sa race",
      "Devenir love coach apprenti d'Alexandre Cormont",
    ],
    correct: 2,
  },
  {
    question: "⚔️ Qui est le plus grand ennemi de Kelyan ?",
    answers: [
      "Céline",
      "Selvi la reine de cette planète Terre la meilleure, la plus belle, la plus impressionnante, la plus talentueuse, la plus parfaite, la plus gentille et inoffensive",
      "Les kleps",
    ],
    correct: 0,
  },
  {
    question: "🎯 Quel mot définirait le plus Kelyan ?",
    answers: [
      "Le professionnalisme",
      "Mais mdr enfaite",
      "Chui pas un petit moi",
    ],
    correct: 1,
  },
  {
    question:
      "📚 Pourquoi Kelyan se lance dans la littérature et écrit un roman de temps en temps ?",
    answers: [
      "Car il est frustré",
      "Car il clc sayez frr on a compris pk toujours tu balances des romans inscris-toi sur Wattpad ça va plus vite frr",
      "Pck il aime roucouler",
    ],
    correct: 1,
  },
  {
    question: "🌍 Quelle est la langue natale de Kelyan ?",
    answers: ["Le mexicain", "Le français", "L'arabe", "Le chinois"],
    correct: 3,
  },
  {
    question: "💕 Aimes-tu Kelyan ?",
    answers: [
      "Oui bien sûr",
      "Yes for sure",
      "Tabiki",
      "Oui bien sûr mais en arabe",
    ],
    correct: 3,
  },
];

// Variables globales
let currentScore = 0;
let currentQuestionIndex = 0;
let isAnswering = false;

// Messages de résultats selon le score
const resultMessages = {
  12: {
    title: "🏆 INCROYABLE ! Tu es le/la meilleur(e) ami(e) de Kelyan !",
    message:
      "Tu connais Kelyan mieux que lui-même ! Es-tu sûr(e) que tu n'es pas Kelyan en personne ? 🤔",
  },
  11: {
    title: "🌟 EXCEPTIONNEL ! Tu es dans le cercle très fermé !",
    message: "Waouh ! Tu es presque aussi génial(e) que Kelyan ! Presque... 😏",
  },
  10: {
    title: "💩 EXCELLENT ! Kelyan serait fier !",
    message:
      "Tu maîtrises bien l'art de connaître notre légende ! Respect ! 👏",
  },
  9: {
    title: "😎 TRÈS BIEN ! Tu es un(e) bon(ne) élève !",
    message:
      "Tu connais bien Kelyan, mais il te reste encore quelques secrets à découvrir ! 🕵️",
  },
  8: {
    title: "👍 BIEN ! Tu es sur la bonne voie !",
    message: "Pas mal du tout ! Tu commences à cerner le personnage ! 😊",
  },
  7: {
    title: "🤷 MOYEN ! Il faut réviser tes classiques !",
    message:
      "Tu connais Kelyan... mais pas assez pour être dans son top 5 ! 📚",
  },
  6: {
    title: "😅 PASSABLE ! Tu t'en sors de justesse !",
    message:
      "Bon, tu sais qui est Kelyan, c'est déjà ça ! Mais tu peux mieux faire ! 💪",
  },
  5: {
    title: "🤔 INSUFFISANT ! Tu mélanges avec quelqu'un d'autre !",
    message: "Es-tu sûr(e) qu'on parle du même Kelyan ? 🙃",
  },
  4: {
    title: "😬 FAIBLE ! Tu ne connais que les bases !",
    message: "Tu sais juste que Kelyan existe, mais c'est à peu près tout ! 😂",
  },
  3: {
    title: "🤦 TRÈS FAIBLE ! Tu confonds avec ton voisin !",
    message:
      "Aïe aïe aïe ! Tu connais Kelyan aussi bien qu'un pingouin connaît le désert ! 🐧",
  },
  2: {
    title: "😱 CATASTROPHIQUE ! Tu vis sur une autre planète !",
    message:
      "Oula... tu connais Kelyan aussi bien qu'un pigeon connaît l'astronomie ! 🐦🚀",
  },
  1: {
    title: "🆘 DRAMATIQUE ! Tu es complètement à côté !",
    message:
      "Tu as confondu Kelyan avec ton chat ? Même ton chat ferait mieux ! 🐱",
  },
  0: {
    title: "💀 LÉGENDAIRE ! Tu as réussi l'impossible !",
    message:
      "Bravo ! Tu as réussi à tout rater ! C'est un talent ça aussi ! 😂💀",
  },
};

// Initialiser le quiz
function initQuiz() {
  currentQuestionIndex = 0;
  currentScore = 0;
  isAnswering = false;

  updateProgress();
  updateQuestionCounter();
  displayCurrentQuestion();
}

// Afficher la question courante
function displayCurrentQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    showFinalResult();
    return;
  }

  const questionData = quizData[currentQuestionIndex];
  const currentQuestionDiv = document.getElementById("current-question");

  // Animation de sortie
  currentQuestionDiv.style.opacity = "0";
  currentQuestionDiv.style.transform = "translateX(-50px)";

  setTimeout(() => {
    // Mettre à jour le contenu
    currentQuestionDiv.innerHTML = `
            <h3>Question ${currentQuestionIndex + 1}: ${
      questionData.question
    }</h3>
            <div class="answers">
                ${questionData.answers
                  .map(
                    (answer, answerIndex) =>
                      `<button class="answer-btn" onclick="selectAnswer(${answerIndex})" data-answer="${answerIndex}">
                        ${answer}
                    </button>`
                  )
                  .join("")}
            </div>
        `;

    // Animation d'entrée
    currentQuestionDiv.style.transform = "translateX(50px)";
    setTimeout(() => {
      currentQuestionDiv.style.transition = "all 0.6s ease";
      currentQuestionDiv.style.opacity = "1";
      currentQuestionDiv.style.transform = "translateX(0)";
    }, 50);
  }, 300);
}

// Mettre à jour la barre de progression
function updateProgress() {
  const progress = document.getElementById("progress");
  const percentage = (currentQuestionIndex / quizData.length) * 100;
  progress.style.width = percentage + "%";
}

// Mettre à jour le compteur de questions
function updateQuestionCounter() {
  document.getElementById("current-num").textContent = currentQuestionIndex + 1;
  document.getElementById("total-num").textContent = quizData.length;
}

// Cette fonction n'est plus nécessaire avec le nouveau système

// Sélectionner une réponse
function selectAnswer(answerIndex) {
  // Empêcher les clics multiples
  if (isAnswering) {
    return;
  }

  isAnswering = true;

  const questionData = quizData[currentQuestionIndex];
  const isCorrect = answerIndex === questionData.correct;
  const answerButtons = document.querySelectorAll(".answer-btn");
  const selectedButton = document.querySelector(
    `[data-answer="${answerIndex}"]`
  );

  // Mettre à jour le score
  if (isCorrect) {
    currentScore++;
    updateScore();
    createHearts(selectedButton);
  }

  // Styliser les réponses
  answerButtons.forEach((btn, index) => {
    if (index === answerIndex) {
      btn.classList.add(isCorrect ? "correct" : "incorrect");
    }
    btn.classList.add("disabled");
  });

  // Passer à la question suivante après 2 secondes
  setTimeout(() => {
    currentQuestionIndex++;
    updateProgress();
    updateQuestionCounter();
    isAnswering = false;
    displayCurrentQuestion();
  }, 2000);
}

// Créer les confettis en forme de cœurs
function createHearts(targetElement) {
  const rect = targetElement.getBoundingClientRect();
  const heartsContainer = document.getElementById("hearts-container");

  // Créer 8 cœurs autour de la zone
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    // Position aléatoire autour du bouton
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 100;

    heart.style.left = rect.left + rect.width / 2 + offsetX + "px";
    heart.style.top = rect.top + rect.height / 2 + offsetY + "px";

    heartsContainer.appendChild(heart);

    // Supprimer le cœur après l'animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 2000);
  }
}

// Mettre à jour le score affiché
function updateScore() {
  document.getElementById("score").textContent = currentScore;
}

// Afficher le résultat final
function showFinalResult() {
  document.getElementById("quiz-container").style.display = "none";

  const finalResult = document.getElementById("final-result");
  const finalMessage = document.getElementById("final-message");
  const finalScore = document.getElementById("final-score");

  const result = resultMessages[currentScore];

  finalMessage.textContent = result.title;
  finalScore.textContent = `Tu as obtenu ${currentScore}/12 ! ${result.message}`;

  // Enregistrer le score dans le classement
  if (currentPlayerName) {
    saveToRanking(currentPlayerName, currentScore);
  }

  finalResult.classList.remove("hidden");

  // Animation d'entrée
  finalResult.style.opacity = "0";
  finalResult.style.transform = "scale(0.8)";

  setTimeout(() => {
    finalResult.style.transition = "all 0.6s ease";
    finalResult.style.opacity = "1";
    finalResult.style.transform = "scale(1)";
  }, 100);
}

// Redémarrer le quiz
function restartQuiz() {
  document.getElementById("final-result").classList.add("hidden");
  document.getElementById("ranking-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("quiz-container").style.display = "block";

  // Faire défiler vers le haut
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Relancer le quiz
  initQuiz();
}

// Initialiser seulement les effets visuels au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Le quiz ne s'initialise pas automatiquement - il faut d'abord entrer un nom
  updateScore();

  // Lancer la neige de Kelyan en continu ! 😂
  createKelyanSnow();

  // Ajouter un effet de particules de fond
  createBackgroundParticles();

  // Focus automatique sur le champ nom
  document.getElementById('player-name').focus();
  
  // Permettre de valider avec Entrée
  document.getElementById('player-name').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      startQuizWithName();
    }
  });
});

// Créer l'effet de neige de Kelyan
function createKelyanSnow() {
  const snowContainer = document.getElementById("kelyan-snow-container");

  // Créer un nouveau visage de Kelyan qui tombe
  function createKelyanFace() {
    const kelyanFace = document.createElement("div");
    kelyanFace.className = "kelyan-face";

    // Pas besoin de innerHTML car on utilise l'image de fond CSS
    // L'image kelyan.jpeg sera affichée via background-image

    // Tailles aléatoires
    const sizes = ["small", "medium", "large"];
    kelyanFace.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

    // Position horizontale aléatoire
    kelyanFace.style.left = Math.random() * window.innerWidth + "px";
    kelyanFace.style.top = "-100px";

    // Durée de chute aléatoire
    const duration = Math.random() * 8 + 5; // 5-13 secondes
    kelyanFace.style.animationDuration = duration + "s";

    // Délai aléatoire pour créer de la variation
    kelyanFace.style.animationDelay = Math.random() * 2 + "s";

    snowContainer.appendChild(kelyanFace);

    // Supprimer l'élément après l'animation
    setTimeout(() => {
      if (kelyanFace.parentNode) {
        kelyanFace.parentNode.removeChild(kelyanFace);
      }
    }, (duration + 2) * 1000);
  }

  // Créer des visages de Kelyan en continu
  setInterval(createKelyanFace, 800); // Un nouveau Kelyan toutes les 0.8 secondes

  // Créer quelques Kelyan immédiatement pour commencer
  for (let i = 0; i < 5; i++) {
    setTimeout(createKelyanFace, i * 200);
  }
}

// Créer des particules de fond pour plus d'effet (réduit car on a maintenant la neige de Kelyan)
function createBackgroundParticles() {
  const particlesCount = 8; // Réduit pour pas surcharger avec la neige de Kelyan
  const body = document.body;

  for (let i = 0; i < particlesCount; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.fontSize = Math.random() * 15 + 8 + "px";
      particle.style.color = getRandomColor();
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = "-50px";
      particle.style.zIndex = "2";
      particle.style.pointerEvents = "none";
      particle.innerHTML = getRandomEmoji();
      particle.style.animation = `heartFall ${
        Math.random() * 3 + 4
      }s linear infinite`;

      body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 7000);
    }, i * 3000);
  }

  // Répéter l'animation moins fréquemment
  setTimeout(createBackgroundParticles, 45000);
}

function getRandomEmoji() {
  const emojis = ["✨", "🌟", "⭐", "💫", "💩", "🎊", "💖", "💝", "🦄", "🌈"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function getRandomColor() {
  const colors = [
    "#FF6B9D",
    "#4ECDC4",
    "#FFE66D",
    "#95E1D3",
    "#A8E6CF",
    "#FFB6C1",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
