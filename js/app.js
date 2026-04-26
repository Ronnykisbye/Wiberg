const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");
const chatBody = document.getElementById("chatBody");

chatButton.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
});

sendChat.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();

  if (!message) return;

  chatBody.innerHTML += `<p><strong>Dig:</strong> ${message}</p>`;

  let response = "Fortæl gerne lidt mere om opgaven, så kan Lars vende tilbage med et tilbud.";

  const lower = message.toLowerCase();

  if (lower.includes("hæk")) {
    response = "Det lyder som hækklipning. Skriv gerne cirka længde og højde på hækken.";
  }

  if (lower.includes("græs")) {
    response = "Græsslåning kan klares som fast aftale eller enkelt opgave. Hvor stor er plænen cirka?";
  }

  if (lower.includes("flis")) {
    response = "Flisearbejde afhænger af areal og underlag. Skriv gerne cirka antal m².";
  }

  if (lower.includes("affald") || lower.includes("oprydning")) {
    response = "Oprydning og bortkørsel kan klares. Skriv gerne hvad der skal fjernes.";
  }

  chatBody.innerHTML += `<p><strong>Lars:</strong> ${response}</p>`;
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}
