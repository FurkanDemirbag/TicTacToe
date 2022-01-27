const boardElement = document.querySelector("#board");
const cellElements = document.querySelectorAll("#board .cell");
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentTurn;

setup();

function setup() {
    boardElement.classList.remove("turn-x", "turn-o");

    for (let cell of cellElements) {
        cell.classList.remove("x", "o");
        cell.addEventListener("click", fillCell, { once: true });
    }

    currentTurn = Math.round(Math.random(0, 1)) == 1 ? "x" : "o";
    boardElement.classList.add("turn-"+ currentTurn);
}

function fillCell() {
    this.classList.add(currentTurn);

    if (checkForWin()) {
        let restart = confirm(currentTurn.toUpperCase() + " kazandı! Yeniden oynamak ister misiniz ?");
        if (restart) {
            setup();
        }
    }
    else if (checkForDraw()) {
        let restart = confirm("Berabere bitti. Yeniden oynamak ister misiniz ?");
        if (restart) {
            setup();
        }
    }
    else {
        currentTurn = currentTurn == "x" ? "o" : "x";
        boardElement.classList.remove("turn-x", "turn-o");
        boardElement.classList.add("turn-"+ currentTurn);
    }
}

function checkForWin() {
    return combinations.some(combination => {
        return combination.every(a => {
            if (cellElements[a].classList.contains(currentTurn)) {
                return true;
            }
            return false;
        });
    });
}

function checkForDraw() {
    return [...cellElements].every(a => {
        if (a.classList.contains("x") || a.classList.contains("o")) {
            return true;
        }
        return false;
    });
}