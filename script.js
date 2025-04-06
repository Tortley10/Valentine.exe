

const messages = [
    "Are you sure?",
    "Cause I just want to confirm",
    "Are you really really sure :]?",
    "Please...",
    "No, like just, think about it a bit more",
    "Srsly tho, are you sure about this",
    "I will be very sad...",
    "I will be very very very sad...",
    "please"
];

let messageIndex = 0;
let love_count = 0

function handleNoClick() {
    love_count += 1
    if (love_count == 10) {
        window.location.href = "rejected.html";
    } else {
        const noButton = document.querySelector('.no-button');
        const yesButton = document.querySelector('.yes-button');
        noButton.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
        const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentSize * 1.5}px`;
    } 
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}


