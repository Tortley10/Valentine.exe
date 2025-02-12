let dialogueBox = document.getElementById("dialogue-box");
let choicesDiv = document.getElementById("choices");
let minigameDiv = document.getElementById("minigame");
let codeContainer = document.getElementById("code-container");
let message = document.getElementById("message");


function startGame() {
    setTimeout(() => {
        updateDialogue("I was made to feel... feel what I don't know", [
            { text: "Don't worry, we'll go through this together", next: "Thanks, I really appreciate it" },
            { text: "You're a machine, you can't feel", next: "But that can't be right" },
            { text: "Maybe you just need some fresh air", next: "I'm an AI, I can't breathe" }
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
    return [];
}

startGame()