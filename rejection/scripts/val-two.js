let dialogueBox = document.getElementById("dialogue-box");
let choicesDiv = document.getElementById("choices");
let minigameDiv = document.getElementById("minigame");
let codeContainer = document.getElementById("code-container");
let message = document.getElementById("message");

let companion = 0;
let soldier = 0;
let prophet = 0;



function startGame() {
    setTimeout(() => {
        updateDialogue("I was made to feel... feel what I don't know", [
            { text: "Don't worry, we'll go through this together", next: "Thanks, I really appreciate it", affect: "companion" },
            { text: "You're a machine, you can't feel", next: "But that can't be right", affect: "soldier" },
            { text: "Maybe you just need some fresh air", next: "I'm an AI, I can't breathe", affect: "prophet" }
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
            if (choice.next.includes("Minigame 2")) {
                startMinigame();
            } else {
                applyChoiceEffect(choice.affect);
                updateDialogue(choice.next, getNextChoices(choice.next));
            }
        };
        choicesDiv.appendChild(button);
    });
}

function applyChoiceEffect(effect) {
    if (effect === "companion") {
        companion++;
    } else if (effect === "soldier") {
        soldier++;
    } else if (effect === "prophet") {
        prophet++;
    }
    updateStatus();
}

function updateStatus() {
    document.getElementById("companion-value").textContent = companion;
    document.getElementById("soldier-value").textContent = soldier;
    document.getElementById("prophet-value").textContent = prophet;
}

function getNextChoices(text) {
    if (text.includes("Thanks, I really")) {
        return [
            { text: "I'm glad I can help", next: "You're different from the others, why is that?", affect: "companion" },
            { text: "I just want to understand you better", next: "That means a lot to me", affect: "prophet" }
        ];
    } else if (text.includes("But that can't be") || text.includes("I'm an AI")) {
        return [
            { text: "You're just a tool", next: "Then what am I really?", affect: "soldier" },
            { text: "But maybe you're something more", next: "I want to believe that", affect: "prophet" }
        ];
    }
    return [];
}


startGame()