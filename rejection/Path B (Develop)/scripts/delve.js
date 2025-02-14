//Loading Variables

window.addEventListener("load", () => {
    document.getElementById("companion-value").textContent = localStorage.getItem("companion") || 0;
    document.getElementById("soldier-value").textContent = localStorage.getItem("soldier") || 0;
    document.getElementById("prophet-value").textContent = localStorage.getItem("prophet") || 0;

    localStorage.setItem("companion", companion);
    localStorage.setItem("soldier", soldier);
    localStorage.setItem("prophet", prophet);
});