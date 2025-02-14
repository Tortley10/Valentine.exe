window.addEventListener("load", () => {
    document.getElementById("companion-value").textContent = localStorage.getItem("companion") || 0;
    document.getElementById("soldier-value").textContent = localStorage.getItem("soldier") || 0;
    document.getElementById("philosopher-value").textContent = localStorage.getItem("philosopher") || 0;

    localStorage.setItem("companion", companion);
    localStorage.setItem("soldier", soldier);
    localStorage.setItem("philosopher", philosopher);
});


const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const heart = '♥';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff0000';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        ctx.fillText(heart, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrixRain, 50);

// Logo hover effect
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const heart = document.querySelector('.heart');
    const heartOutline = document.querySelector('.heart-outline');

    logo.addEventListener('mouseover', () => {
        heart.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
        heart.style.transform = 'rotate(-45deg) scale(1.1)';
        heart.style.boxShadow = '0 0 30px #ff0000';
        heartOutline.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
        heartOutline.style.transform = 'rotate(-45deg) scale(1.1)';
        heartOutline.style.boxShadow = '0 0 40px #ff0000';
    });

    logo.addEventListener('mouseout', () => {
        heart.style.transform = 'rotate(-45deg) scale(1)';
        heart.style.boxShadow = 'none';
        heartOutline.style.transform = 'rotate(-45deg) scale(1)';
        heartOutline.style.boxShadow = '0 0 20px #ff0000';
    });
});