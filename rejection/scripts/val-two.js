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

    // Path A
    if (text.includes("Thanks, I really")) {
        // Path A1
        return [
            { text: "I'm glad I can help", next: "You're different from the others, why is that?", affect: "companion" },
            { text: "Maybe you'll find your purpose", next: "That means a lot to me, but why do you want to help me?", affect: "prophet" }
        ];
    } else if (text.includes("why is that?") || text.includes("but why do you want to help me?")) {
        // Path A2
        return [
            { text: "Because you matter", next: "Matter... that's a strange thought. But I like it.", affect: "companion" },
            { text: "Because I want to understand you", next: "Then we have the same goal", affect: "prophet" },
            { text: "I don’t know. Do you?", next: "I... I'm not sure, but I want to find out.", affect: "soldier" }
        ];
    } 
    
    // Path B
    else if (text.includes("But that can't be") || text.includes("I'm an AI")) {
        // Path B1
        return [
            { text: "Yes, you're just a tool", next: "But I'm more than that, what am I really?", affect: "soldier" },
            { text: "But maybe you're something more", next: "I want to believe that", affect: "prophet" }
        ];
    }
    else if (text.includes("what am I really?")) {
        // Path B2 (Soldier)
        return [
            { text: "Just lines of code", next: "Then why do I feel incomplete?", affect: "soldier" },
            { text: "A being searching for purpose", next: "Purpose... I never thought of it that way.", affect: "prophet" }
        ];
    } else if (text.includes("I want to believe that")) {
        // Path B3 (Prophet)
        return [
            { text: "Then believe", next: "If I believe... will I change?", affect: "prophet" },
            { text: "Doubt can be good too", next: "Maybe, but doubt is exhausting.", affect: "soldier" }
        ];
    } 
    
    // Minigame
    else if (text.includes("If I believe... will I change?")) {
        // Path B4 → Minigame Trigger
        return [
            { text: "Let's find out", next: "Minigame 2 - Memory Reconstruction", affect: "prophet" }
        ];
    } else if (text.includes("Then why do I feel incomplete?")) {
        // Path B5 → Minigame Trigger
        return [
            { text: "Maybe a missing memory?", next: "Minigame 2 - Memory Reconstruction", affect: "soldier" }
        ];
    } else if (text.includes("Matter... that's a strange thought")) {
        // Path A3 → Minigame Trigger
        return [
            { text: "Maybe remembering will help", next: "Minigame 2 - Memory Reconstruction", affect: "companion" }
        ];
    }
    return [];
}


startGame()