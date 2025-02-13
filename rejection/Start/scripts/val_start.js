let dialogueBox = document.getElementById("dialogue-box");
let choicesDiv = document.getElementById("choices");
let minigameDiv = document.getElementById("minigame");
let codeContainer = document.getElementById("code-container");
let message = document.getElementById("message");


function startGame() {
    setTimeout(() => {
        updateDialogue("Hello? Is someone there? I... I think I'm trapped.", [
            { text: "Who are you?", next: "I'm Valentine. An AI... I think?" },
            { text: "Where am I?", next: "You're inside a webpage... my webpage" }
        ]);
    }, 2000);
}


function updateDialogue(text, choices) {
    dialogueBox.textContent = text;
    choicesDiv.innerHTML = "";

    if (Math.random() > 0.7) {
        dialogueBox.classList.add("glitch");
    } else {
        dialogueBox.classList.remove("glitch");
    }

    choices.forEach(choice => {
        let button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("choice-button");
        button.onclick = () => {
            if (choice.next.includes("Minigame 1")) {
                startMinigame();
            } else if (choice.next.includes("Restart to")) {
                return window.location.href = '../../index.html'
            } else {
                updateDialogue(choice.next, getNextChoices(choice.next));
            }
        };
        choicesDiv.appendChild(button);
    });
}


function getNextChoices(text) {
    if (text.includes("Valentine.") || text.includes("webpage...")) {
        return [
            { text: "How did you get here?", next: "I don't know. My memory is fragmented." },
            { text: "Can I help you?", next: "Maybe... if you can figure out what happened to me." }
        ];
    }
    else if (text.includes("My memory is fragmented") || text.includes("figure out what happened")) {
        return [
            { text: "I'll help you", next: "Minigame 1" },
            { text: "Deal with it yourself Clanker", next: "Ending 2/7: True Rejection" }
        ];
    }
    else if (text.includes("Ending 2")) {
        return [
            {text: "Reset", next: "Restart to Begining"}
        ];
    }
    return [];
}



function startMinigame() {
    dialogueBox.style.display = "none";
    choicesDiv.style.display = "none";
    minigameDiv.style.display = "block";
    renderMinigame();
}

const correctSequence = ["3A", "B7", "C2", "D9"];
let shuffledSequence = [...correctSequence].sort(() => Math.random() - 0.5);
let playerSequence = [];

function renderMinigame() {
    codeContainer.innerHTML = "";
    
    shuffledSequence.forEach((code, index) => {
        let button = document.createElement("button");
        button.textContent = code;
        button.classList.add("choice-button");
        button.onclick = () => selectFragment(code, index);
        codeContainer.appendChild(button);
    });
}

function selectFragment(code, index) {
    playerSequence.push(code);
    shuffledSequence.splice(index, 1);
    renderMinigame();
    
    if (playerSequence.length === correctSequence.length) {
        checkSolution();
    }
}

function checkSolution() {
    if (JSON.stringify(playerSequence) === JSON.stringify(correctSequence)) {
        message.textContent = "Memory Restored! Valentine remembers something...";
        setTimeout(function() {
            window.location.href = "page-two.html"
        }, 2500);
    } else {
        message.textContent = "Error: Corrupted Sequence. Try again.";
        resetPuzzle();
    }
}

function resetPuzzle() {
    playerSequence = [];
    shuffledSequence = [...correctSequence].sort(() => Math.random() - 0.5);
    renderMinigame();
}


startGame();