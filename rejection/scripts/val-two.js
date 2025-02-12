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