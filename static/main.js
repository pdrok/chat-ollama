
const form = document.getElementById("chat-form");
const responseDiv = document.getElementById("response");
const promptTextarea = document.getElementById("prompt");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    responseDiv.innerHTML = ""; // limpiar

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    const formData = new FormData(form);
    const prompt = formData.get("prompt");
    promptTextarea.disabled = true;

    spinner.textContent = "Pensando...";
    spinner.style.display = "block";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let accumulated = "";
    let firstChunkReceived = false;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.LOADING || xhr.readyState === XMLHttpRequest.DONE) {
            accumulated = xhr.responseText;
            // Convierte el Markdown acumulado a HTML
            responseDiv.innerHTML = marked.parse(accumulated);
            
            responseDiv.scrollTop = responseDiv.scrollHeight;

            if (!firstChunkReceived && accumulated.trim().length > 0) {
                spinner.textContent = "Generando respuesta...";
                firstChunkReceived = true;
            }

            if (xhr.readyState === XMLHttpRequest.DONE) {
                submitButton.disabled = false;
                promptTextarea.disabled = false;
                spinner.style.display = "none";
            }
        }
    };

    xhr.send("prompt=" + encodeURIComponent(prompt));
});

