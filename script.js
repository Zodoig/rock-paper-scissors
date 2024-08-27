let playerScore = 0;
let computerScore = 0;

const playButton = document.querySelector(".play-button");
const mainContent = document.querySelector("main");

function setupGame() {
    
    mainContent.innerHTML = '';

    setTimeout(() => {
        gameWindow.scrollIntoView({ behavior: "smooth" });
    }, 100);


    const gameWindow = document.createElement("div");
    gameWindow.className = "game-window";
    mainContent.appendChild(gameWindow);

    const computerRival = document.createElement("img");
    computerRival.className = "computer";
    computerRival.alt = "Computer opponent with neutral expression";
    computerRival.src = "./assets/neutral-computer.png";
    gameWindow.appendChild(computerRival);

    const speechBubble = document.createElement("div");
    speechBubble.className = "speech-bubble";
    speechBubble.style.backgroundImage = "url('./assets/speech-bubble.png')";
    gameWindow.appendChild(speechBubble);

    const speechContent = document.createElement("p");
    speechContent.innerHTML = "You sure you wanna choose that?";
    speechBubble.appendChild(speechContent);

    const tableTop = document.createElement("div");
    tableTop.className = "table-top";
    tableTop.style.backgroundImage = "url('assets/table.png')";
    gameWindow.appendChild(tableTop);

    const rockPaperScissorsBox = document.createElement("div");
    rockPaperScissorsBox.className = "rPPBox";
    tableTop.appendChild(rockPaperScissorsBox);

    const rock = document.createElement("img");
    rock.className = "rock rppItem";
    rock.alt = "a gray rock";
    rock.src = "./assets/rock.png";
    rockPaperScissorsBox.appendChild(rock);

    const paper = document.createElement("img");
    paper.className = "paper rppItem";
    paper.alt = "a piece of paper";
    paper.src = "./assets/paper.png";
    rockPaperScissorsBox.appendChild(paper);

    const scissors = document.createElement("img");
    scissors.className = "scissors rppItem";
    scissors.alt = "a pair of scissors";
    scissors.src = "./assets/scissors.png";
    rockPaperScissorsBox.appendChild(scissors);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-div";
    tableTop.appendChild(buttonDiv);

    const confirmButton = document.createElement("button");
    confirmButton.className = "confirm-button";
    confirmButton.innerHTML = "CONFIRM?";
    buttonDiv.appendChild(confirmButton);

    const scoreBoard = document.createElement("div");
    scoreBoard.className = "score-board";

    const scoreDisplay = document.createElement("p");
    scoreDisplay.className = "score";
    scoreDisplay.innerHTML = `Player Score ${playerScore} - ${computerScore} Computer Score`;
    scoreBoard.appendChild(scoreDisplay);
    gameWindow.appendChild(scoreBoard);

    let playerChoice;
    let computerChoice;

    rock.addEventListener("click", () => {
        resetSelection();
        confirmButton.style.display = 'block';
        speechBubble.style.display = 'block';
        speechContent.style.display = 'block';
        rock.style.transform = "scale(2)";
        rock.style.transition = "transform 0.3s ease";
        playerChoice = "rock";
    });

    paper.addEventListener("click", () => {
        resetSelection();
        confirmButton.style.display = 'block';
        speechBubble.style.display = 'block';
        speechContent.style.display = 'block';
        paper.style.transform = "scale(2)";
        paper.style.transition = "transform 0.3s ease";
        playerChoice = "paper";
    });

    scissors.addEventListener("click", () => {
        resetSelection();
        confirmButton.style.display = 'block';
        speechBubble.style.display = 'block';
        speechContent.style.display = 'block';
        scissors.style.transform = "scale(2)";
        scissors.style.transition = "transform 0.3s ease";
        playerChoice = "scissors";
    });

    function randomSelect() {
        let randomNum = Math.floor(Math.random() * 3);
        if (randomNum === 0) {
            speechBubble.style.backgroundImage = "url('./assets/speech-bubble-rock.png')";
            speechBubble.style.display = "block";
            speechContent.innerHTML = " ";
            return "rock";
        } else if (randomNum === 1) {
            speechBubble.style.backgroundImage = "url('./assets/speech-bubble-paper.png')";
            speechBubble.style.display = "block";
            speechContent.innerHTML = " ";
            return "paper";
        } else {
            speechBubble.style.backgroundImage = "url('./assets/speech-bubble-scissors.png')";
            speechBubble.style.display = "block";
            speechContent.innerHTML = " ";
            return "scissors";
        }
    }

    const playAgainButton = document.createElement("button");
    playAgainButton.className = "play-again-btn";
    playAgainButton.innerHTML = "PLAY AGAIN?";
    playAgainButton.style.display = "none";
    tableTop.appendChild(playAgainButton);

    confirmButton.addEventListener("click", () => {
        rock.style.pointerEvents = "none";
        paper.style.pointerEvents = "none";
        scissors.style.pointerEvents = "none";
        confirmButton.disabled = true;

        speechBubble.style.display = "none";
        speechContent.style.display = "none";
        confirmButton.style.display = "none";

        computerChoice = randomSelect();

        const endResult = document.createElement("h1");
        tableTop.appendChild(endResult);

        if (playerChoice === computerChoice) {
            endResult.innerHTML = "It's a draw...";
            endResult.className = "its-a-draw-msg";
            playAgainButton.style.display = "block";
        } else if (
            (playerChoice === "rock" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "rock")
        ) {
            endResult.innerHTML = "Computer wins!";
            computerRival.src = "./assets/happy-computer.png";
            endResult.className = "you-lose-msg";
            playAgainButton.style.display = "block";
            computerScore++;
        } else {
            endResult.innerHTML = "You win!";
            computerRival.src = "./assets/angry-computer.png";
            endResult.className = "you-win-msg";
            playAgainButton.style.display = "block";
            playerScore++;
        }

        scoreDisplay.innerHTML = `Player Score   ${playerScore} - ${computerScore}   Computer Score`;
    });

    playAgainButton.addEventListener("click", () => {
        setupGame(); 
    });

    function resetSelection() {
        rock.style.transform = "scale(1)";
        paper.style.transform = "scale(1)";
        scissors.style.transform = "scale(1)";
    }
}

playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    setupGame(); 
});