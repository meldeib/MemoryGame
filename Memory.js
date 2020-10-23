const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let click = false;
let currentScore = 0;
let lowestScore = localStorage.getItem("lowestScore");

if (lowestScore) {
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}
function handleCardClick(event) {
    if (click) return;
    if (event.target.classList.contains("flipped")) return;
    let clickedCard = event.target;
    clickedCard.style.backgroundColor = clickedCard.classList[0];
  
  if (!firstCard || !secondCard) {
      clickedCard.classList.add("flipped");
      score(currentScore + 1);
      firstCard = firstCard || clickedCard;
      secondCard = clickedCard === firstCard ? null : clickedCard;
  }
  if (firstCard && secondCard) {
      click = true;
      let slot1 = firstCard.className;
      let slot2 = secondCard.className;
      if (slot1 === slot2) {
          flippedCards += 2;
          firstCard.removeEventListener("click", handleCardClick);
          secondCard.removeEventListener("click", handleCardClick);
          firstCard = null;
          secondCard = null;
          click = false;
      } else {
          setTimeout(function() {
              firstCard.style.backgroundColor = "";
              secondCard.style.backgroundColor = "";
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              firstCard = null;
              secondCard = null;
              click = false;
          }, 1000);
      }
  }
  if (flippedCards === COLORS.length){
    alert ("You win");
    let rstBtn = document.createElement("button");
    rstBtn.innerText = "Play Again!";
    let empty = document.getElementById("empty");
    empty.append(rstBtn)
    rstBtn.addEventListener("click", newGame);
    let newLowest = +localStorage.getItem(lowestScore);
    if (currentScore < newLowest){
        localStorage.setItem("lowestScore", currentScore);
    }
  }
}
createDivsForColors(shuffledColors);

function newGame(){
    location.reload();
    score(0);
}
function score(newScore){
    currentScore = newScore;
    document.getElementById("currentScore").innerText = currentScore;

}