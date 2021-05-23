"use strict";

function resetUI(sc, ul) {
    score = sc;
    secretNumber = Math.trunc(Math.random() * ul + 1);
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".score").textContent = score;
    document.querySelector("h1").textContent = "GUESS MY NUMBER";
    switch (ul) {
        case 20:
            document.querySelector(".number").style.width = "15rem";
            document.querySelector(".number").style.padding = "3.2rem 0rem";
            break;
        case 100:
            document.querySelector(".number").style.width = "15rem";
            document.querySelector(".number").style.padding = "3.2rem 0rem";
            break;
        case 10000:
            document.querySelector(".number").style.width = "20rem";
            document.querySelector(".number").style.padding = "6rem 0rem";
            break;
        case 1000000:
            document.querySelector(".number").style.width = "30rem";
            document.querySelector(".number").style.padding = "11rem 0rem";
            break;
    }
    document.querySelector(".number").style.fontSize = "6rem";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
}

var secretNumber = 99;
let upperLimit,
    score,
    initialScore = 30;

document.querySelector(".start-game").addEventListener("click", function () {
    document.querySelector(".again").style.display = "inline-block";
    document.querySelector(".between").style.display = "inline-block";
    document.querySelector("main").style.display = "flex";
    document.querySelector(".choose-dif").style.display = "none";

    const diff = document.querySelector("#select-dif").value;
    switch (diff) {
        case "easy":
            upperLimit = 20;
            break;
        case "medium":
            upperLimit = 100;
            break;
        case "hard":
            upperLimit = 10000;
            break;
        case "extreme":
            upperLimit = 1000000;
            break;
        default:
            throw new Error("difficulty not set");
    }
    document.querySelector(".between").textContent =
        "( between 1 and " + upperLimit + " )";
    score = initialScore;
    let highscore = 0;
    resetUI(score, upperLimit);

    document.querySelector(".check").addEventListener("click", function () {
        const guess = Number(document.querySelector(".guess").value);
        /*console.log(guess, secretNumber);*/
        if (!guess) {
            document.querySelector(".message").textContent =
                "No number detected.";
        } else if (guess === secretNumber) {
            document.querySelector(".message").textContent = "Correct number!";
            document.querySelector("h1").textContent = "You found it!";
            switch (upperLimit) {
                case 20:
                    document.querySelector(".number").style.width = "20rem";
                    document.querySelector(".number").style.padding =
                        "4rem 0rem";
                    break;
                case 100:
                    document.querySelector(".number").style.width = "20rem";
                    document.querySelector(".number").style.padding =
                        "4rem 0rem";
                    break;
                case 10000:
                    document.querySelector(".number").style.width = "28rem";
                    document.querySelector(".number").style.padding =
                        "7.5rem 0rem";
                    break;
                case 1000000:
                    document.querySelector(".number").style.width = "35rem";
                    document.querySelector(".number").style.padding =
                        "11.5rem 0rem";
                    break;
            }
            document.querySelector("h1").style.top = "32%";
            document.querySelector(".number").style.fontSize = "9rem";
            document.querySelector(".number").textContent = secretNumber;
            if (score > highscore) {
                highscore = score;
                document.querySelector(".highscore").textContent = highscore;
            }
        } else if (guess !== secretNumber) {
            if (score > 1) {
                document.querySelector(".message").textContent =
                    guess > secretNumber ? "Too high!" : "Too low!";
                score--;
                document.querySelector(".score").textContent = score;
            } else {
                document.querySelector(".message").textContent =
                    "You lost the game!";
                document.querySelector(".score").textContent = 0;
            }
        }
    });

    document.querySelector(".again").addEventListener("click", function () {
        resetUI(initialScore, upperLimit);
    });
});

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close-modal");
const btnOpen = document.querySelector(".show-modal");

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

btnOpen.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
