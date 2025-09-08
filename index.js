let user1score = 0;
let user2score = 0;
let computerscore = 0;
let round = 0;
const maxRounds = 10;

const user1score_span = document.getElementById("user1-score");
const user2score_span = document.getElementById("user2-score");
const computerscore_span = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");
const actionMessage = document.getElementById("action-message");
const roundsLeftDisplay = document.getElementById("rounds-left"); // <--- add this element in HTML

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  return choices[Math.floor(Math.random() * 3)];
}

function choiceToWord(choice) {
  if (choice === "r") return "Rock";
  if (choice === "p") return "Paper";
  return "Scissors";
}

function beats(a, b) {
  return (a === "r" && b === "s") ||
         (a === "p" && b === "r") ||
         (a === "s" && b === "p");
}

function game(user1choice, user2choice) {
  if (round >= maxRounds) {
    showFinalWinner();
    return;
  }

  const computerChoice = getComputerChoice();
  round++;
  let resultText = `Round ${round}: User 1 chose ${choiceToWord(user1choice)} | ` +
                   `User 2 chose ${choiceToWord(user2choice)} | ` +
                   `Computer chose ${choiceToWord(computerChoice)}\n`;
  let winners = [];

  if (beats(user1choice, user2choice) && beats(user1choice, computerChoice)) {
    winners.push("User 1");
  }
  if (beats(user2choice, user1choice) && beats(user2choice, computerChoice)) {
    winners.push("User 2");
  }
  if (beats(computerChoice, user1choice) && beats(computerChoice, user2choice)) {
    winners.push("Computer");
  }

  if (beats(user1choice, computerChoice) && beats(user2choice, computerChoice)) {
    winners.push("User 1", "User 2");
  }
  if (beats(user1choice, user2choice) && beats(computerChoice, user2choice)) {
    winners.push("User 1", "Computer");
  }
  if (beats(user2choice, user1choice) && beats(computerChoice, user1choice)) {
    winners.push("User 2", "Computer");
  }

  winners = [...new Set(winners)];

  if (winners.length === 0) {
    resultText += "It's a tie!";
  } else if (winners.length === 1) {
    resultText += winners[0] + " wins and gets 3 points!";
    if (winners[0] === "User 1") user1score += 3;
    if (winners[0] === "User 2") user2score += 3;
    if (winners[0] === "Computer") computerscore += 3;
  } else if (winners.length === 2) {
    resultText += winners.join(" & ") + " win together and get 1 point each!";
    if (winners.includes("User 1")) user1score += 1;
    if (winners.includes("User 2")) user2score += 1;
    if (winners.includes("Computer")) computerscore += 1;
  }

  resultMessage.innerText = resultText;
  user1score_span.innerText = user1score;
  user2score_span.innerText = user2score;
  computerscore_span.innerText = computerscore;

  const roundsLeft = maxRounds - round;
  if (round >= maxRounds) {
    showFinalWinner();
  } else {
    roundsLeftDisplay.innerText = `Rounds left: ${roundsLeft}`;
    actionMessage.innerText = "Make your move!";
  }
}

function showFinalWinner() {
  let maxScore = Math.max(user1score, user2score, computerscore);
  let champions = [];
  if (user1score === maxScore) champions.push("User 1");
  if (user2score === maxScore) champions.push("User 2");
  if (computerscore === maxScore) champions.push("Computer");

  if (champions.length === 1) {
    resultMessage.innerText = `🏆 ${champions[0]} is the champion with ${maxScore} points!`;
  } else {
    resultMessage.innerText = `🤝 ${champions.join(" & ")} tie as champions with ${maxScore} points!`;
  }

  actionMessage.innerText = "Game Over!";
  roundsLeftDisplay.innerText = "";
}

let tempChoices = {};

function setChoice(player, choice) {
  tempChoices[player] = choice;
  if (tempChoices["user1"] && tempChoices["user2"]) {
    game(tempChoices["user1"], tempChoices["user2"]);
    tempChoices = {};
  } else {
    actionMessage.innerText = player + " has chosen...";
  }
}

function createChoiceImages() {
  const choices = {
    "user1-r": "rock.png",
    "user1-p": "paper.png",
    "user1-s": "scissors.png",
    "user2-r": "rock.png",
    "user2-p": "paper.png",
    "user2-s": "scissors.png"
  };

  for (const id in choices) {
    const choiceDiv = document.getElementById(id);
    if (choiceDiv) {
      const img = document.createElement("img");
      img.src = `image/${choices[id]}`;
      choiceDiv.appendChild(img);
    }
  }
}

function resetGame() {
  user1score = 0;
  user2score = 0;
  computerscore = 0;
  round = 0;
  tempChoices = {};

  user1score_span.innerText = user1score;
  user2score_span.innerText = user2score;
  computerscore_span.innerText = computerscore;

  resultMessage.innerText = "Game reset! Ready to play again.";
  actionMessage.innerText = "Make your move!";
  roundsLeftDisplay.innerText = `Rounds left: ${maxRounds}`;
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

createChoiceImages();

document.getElementById("user1-r").addEventListener("click", () => setChoice("user1", "r"));
document.getElementById("user1-p").addEventListener("click", () => setChoice("user1", "p"));
document.getElementById("user1-s").addEventListener("click", () => setChoice("user1", "s"));

document.getElementById("user2-r").addEventListener("click", () => setChoice("user2", "r"));
document.getElementById("user2-p").addEventListener("click", () => setChoice("user2", "p"));
document.getElementById("user2-s").addEventListener("click", () => setChoice("user2", "s"));
