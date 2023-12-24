console.log("hello world");

// Constants & Variables used in the game
let gameMusic = new Audio("../music/gameMusic.mp3");
let turnMusic = new Audio("../music/ting.mp3");
let victoryMusic = new Audio("../music/victory.mp3");

let playerX = prompt("Enter name for Player X:");
let playerO = prompt("Enter name for Player O:");

let turn = "";
let currentPlayer = "";
let gameover = false;


// Functions used in the game


// Function to perform the toss
const performToss = () => {

    // Display toss performing text
    document.querySelector(".info").innerText = "Toss Performing...";

    // Display toss GIF
    document.getElementById("tossGIF").style.display = "block";
    return new Promise(resolve => {
        // Simulate delay for the toss
        setTimeout(() => {
            let tossResult = Math.random() < 0.5 ? "X" : "O";
            let tossWinner = tossResult === "X" ? playerX : playerO;
            // Hide toss GIF after the delay
            document.getElementById("tossGIF").style.display = "none";
            resolve({ tossResult, tossWinner });
        }, 2000); // Adjust the delay time (in milliseconds) as needed
    });
};

// Function to initialize the game
const initializeGame = async () => {
    gameMusic.loop = true; // Loop the game music
    gameMusic.play();
    document.getElementById("gameGIF").style.display = "block";
    let tossInfo = await performToss();
    turn = tossInfo.tossResult;
    currentPlayer = tossInfo.tossWinner; // This is the player who won the toss
    let selectedSymbol = prompt(`${currentPlayer}, you won the toss. Choose 'X' or 'O':`);
    selectedSymbol = selectedSymbol.toUpperCase();
    
    if (selectedSymbol !== 'X' && selectedSymbol !== 'O') {
        // If an invalid symbol is entered, default to 'X'
        selectedSymbol = 'X';
    }

    turn = selectedSymbol;
    document.querySelector(".info").innerText = `Toss won by ${currentPlayer}. ${currentPlayer} will play with ${turn}.`;
};


const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let gridboxtext = document.getElementsByClassName("gridboxtext");
    let winCombinations = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    winCombinations.forEach((e) => {
        if (
            gridboxtext[e[0]].innerText === gridboxtext[e[1]].innerText &&
            gridboxtext[e[2]].innerText === gridboxtext[e[1]].innerText &&
            gridboxtext[e[0]].innerText !== ""
        ) {

            let winnerName = gridboxtext[e[0]].innerText === "X" ? playerX : playerO;
            document.querySelector(".info").innerText = winnerName + " Won";

            gameover = true;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            document.getElementById("gameGIF").style.display = "none";
            document.getElementById("winGIF").style.display = "block";
            gameMusic.pause(); // Pause the game music
            victoryMusic.play();



        }
    });
};

// Main Logic of the game
initializeGame();

let gridBoxes = document.getElementsByClassName("gridbox");
Array.from(gridBoxes).forEach((element) => {
    let gridboxtext = element.querySelector(".gridboxtext");
    element.addEventListener("click", () => {
        if (gridboxtext.innerText === "") {
            gridboxtext.innerText = turn;
            turn = changeTurn();
            currentPlayer = turn === "X" ? playerX : playerO;
            turnMusic.play();
            checkWin();
            if (!gameover) {
                document.querySelector(".info").innerText =  currentPlayer + `'s turn `;
            }
        }
    });
});

// Play Again Logic
playAgain.addEventListener("click", () => {
    let gridboxtext = document.querySelectorAll(".gridboxtext");
    Array.from(gridboxtext).forEach((e) => {
        e.innerText = "";
    });
    initializeGame();
    gameover = false;
    document.querySelector(".line").style.width = "0vw";
});
