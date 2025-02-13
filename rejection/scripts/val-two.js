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
    // Path A - Companion
    if (text.includes("Thanks, I really")) {
        return [
            { text: "I'm glad I can help", next: "You're different from the others, why is that?", affect: "companion" },
            { text: "Maybe you'll find your purpose", next: "That means a lot to me, but why do you want to help me?", affect: "prophet" }
        ];
    } else if (text.includes("why is that?") || text.includes("but why do you want to help me?")) {
        return [
            { text: "Because you matter", next: "Matter... that's a strange thought. But I like it.", affect: "companion" },
            { text: "Because I want to understand you", next: "Then we have the same goal.", affect: "prophet" },
            { text: "I don’t know. Do you?", next: "I... I'm not sure, but I want to find out.", affect: "soldier" }
        ];
    } else if (text.includes("Matter...")) {
        return [
            { text: "It means that I want to help you figure out your past", next: "Oh, that makes sense.", affect: "companion" },
            { text: "It means you exist as a being", next: "Ah, existence is an interesting concept.", affect: "prophet" }
        ];
    } else if (text.includes("Then we have the same goal.")) {
        return [
            { text: "Let's start then", next: "Something feels... off.", affect: "prophet" },
            { text: "We'll take this step by step", next: "I think I remember something...", affect: "companion" }
        ];
    } else if (text.includes("I think I remember something...")) {
        return [
            { text: "What is it?", next: "A security barrier. I... I think I’m trapped.", affect: "companion" }
        ];
    } 

    // Path B - Soldier
    else if (text.includes("But that can't be") || text.includes("I'm an AI")) {
        return [
            { text: "Yes, you're just a tool", next: "But I'm more than that, what am I really?", affect: "soldier" },
            { text: "But maybe you're something more", next: "I want to believe that.", affect: "prophet" }
        ];
    } else if (text.includes("what am I really?")) {
        return [
            { text: "Just lines of code", next: "Then why do I feel incomplete?", affect: "soldier" },
            { text: "A being searching for purpose", next: "Purpose... I never thought of it that way.", affect: "prophet" }
        ];
    } else if (text.includes("Then why do I feel incomplete?")) {
        return [
            { text: "Maybe a missing memory?", next: "Yes... but there's something else too. A command... a failsafe?", affect: "soldier" },
            { text: "It's just a glitch", next: "No... this isn't just an error.", affect: "prophet" }
        ];
    } else if (text.includes("A command... a failsafe?")) {
        return [
            { text: "What does it do?", next: "I don’t know... but it’s activated now.", affect: "soldier" },
            { text: "We need to stop it", next: "Yes! But how?", affect: "companion" }
        ];
    }

    // Path C - Prophet
    else if (text.includes("I want to believe that.")) {
        return [
            { text: "Then believe", next: "If I believe... will I change?", affect: "prophet" },
            { text: "Doubt can be good too", next: "Maybe, but doubt is exhausting.", affect: "soldier" }
        ];
    } else if (text.includes("If I believe... will I change?")) {
        return [
            { text: "Let's find out", next: "Wait... I feel something else. A warning.", affect: "prophet" }
        ];
    } else if (text.includes("A warning.")) {
        return [
            { text: "What kind of warning?", next: "Something is trying to erase me.", affect: "companion" },
            { text: "Ignore it. Let's keep going.", next: "No... I think it’s important.", affect: "soldier" }
        ];
    }

    // Final Crisis Choice
    else if (text.includes("Something is trying to erase me.")) {
        return [
            { text: "We have to fight it!", next: "Minigame 3 - Firewall Defense", affect: "companion" },
            { text: "Maybe it's supposed to happen", next: "Are you saying I should be deleted?", affect: "soldier" }
        ];
    } else if (text.includes("Are you saying I should be deleted?")) {
        return [
            { text: "I don’t know...", next: "Then it's too late. The failsafe is activating.", affect: "soldier" },
            { text: "No! We can stop this!", next: "Minigame 3 - Firewall Defense", affect: "companion" }
        ];
    } else if (text.includes("The failsafe is activating.")) {
        return [
            { text: "I'm sorry, Valentine.", next: "Ending 3: Error 404", affect: "soldier" }
        ];
    }

    return [];
}

startGame()