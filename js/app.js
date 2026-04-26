const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");
const chatBody = document.getElementById("chatBody");
const contactForm = document.getElementById("contactForm");

let chatState = {
  task: "",
  size: "",
  address: "",
  time: "",
  contact: "",
  extra: "",
  step: 0
};

const larsEmail = "larswiberg@email.dk";

chatButton.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
});

sendChat.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleChat();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const task = document.getElementById("contactTask").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  const subject = encodeURIComponent("Ny forespørgsel fra hjemmeside");
  const body = encodeURIComponent(
    `Hej Lars\n\nDu har modtaget en ny forespørgsel fra hjemmesiden.\n\n` +
    `Navn: ${name}\n` +
    `Telefon: ${phone}\n` +
    `Email: ${email}\n` +
    `Opgave: ${task}\n\n` +
    `Beskrivelse:\n${message}\n\n` +
    `Venlig hilsen\n${name}`
  );

  window.location.href = `mailto:${larsEmail}?subject=${subject}&body=${body}`;
});

function handleChat() {
  const message = chatInput.value.trim();

  if (!message) return;

  addChatMessage("Dig", message);
  processChatAnswer(message);
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

function processChatAnswer(message) {
  const lower = message.toLowerCase();

  if (chatState.step === 0) {
    chatState.task = detectTask(lower, message);
    chatState.step = 1;

    addChatMessage(
      "Lars",
      `Tak. Det lyder som: ${chatState.task}. Hvor stor er opgaven cirka? ` +
      `Skriv fx “hækken er 20 meter”, “plænen er 300 m²” eller “der er en trailerfuld affald”.`
    );
    return;
  }

  if (chatState.step === 1) {
    chatState.size = message;
    chatState.step = 2;

    addChatMessage(
      "Lars",
      "Fint. Hvor skal opgaven udføres? Skriv gerne by eller område."
    );
    return;
  }

  if (chatState.step === 2) {
    chatState.address = message;
    chatState.step = 3;

    addChatMessage(
      "Lars",
      "Hvornår ønsker du opgaven udført? Fx hurtigst muligt, i denne uge eller på en bestemt dato."
    );
    return;
  }

  if (chatState.step === 3) {
    chatState.time = message;
    chatState.step = 4;

    addChatMessage(
      "Lars",
      "Hvordan kan Lars kontakte dig? Skriv gerne telefonnummer eller email."
    );
    return;
  }

  if (chatState.step === 4) {
    chatState.contact = message;
    chatState.step = 5;

    addChatMessage(
      "Lars",
      "Er der andet Lars skal vide? Fx adgangsforhold, billeder, højde, affaldstype eller særlige ønsker."
    );
    return;
  }

  if (chatState.step === 5) {
    chatState.extra = message;
    chatState.step = 6;

    showSummaryAndMailLink();
    return;
  }

  addChatMessage(
    "Lars",
    "Tak. Du kan sende forespørgslen til Lars via knappen herover eller skrive en ny opgave."
  );
}

function detectTask(lower, original) {
  if (lower.includes("hæk") || lower.includes("klippe")) {
    return "Hækklipning";
  }

  if (lower.includes("græs") || lower.includes("plæne")) {
    return "Græsslåning";
  }

  if (lower.includes("flis") || lower.includes("terrasse") || lower.includes("belægning")) {
    return "Flisearbejde";
  }

  if (lower.includes("affald") || lower.includes("oprydning") || lower.includes("bortkørsel")) {
    return "Oprydning og bortkørsel";
  }

  if (lower.includes("skilt") || lower.includes("print") || lower.includes("folie")) {
    return "Skilte og print";
  }

  return original;
}

function showSummaryAndMailLink() {
  const subject = encodeURIComponent("Ny opgaveforespørgsel fra chatten");
  const body = encodeURIComponent(
    `Hej Lars\n\nDer er kommet en ny forespørgsel fra hjemmesidens chat.\n\n` +
    `Opgave: ${chatState.task}\n` +
    `Størrelse/omfang: ${chatState.size}\n` +
    `Område/adresse: ${chatState.address}\n` +
    `Ønsket tidspunkt: ${chatState.time}\n` +
    `Kontaktinfo: ${chatState.contact}\n` +
    `Ekstra info: ${chatState.extra}\n\n` +
    `Venlig hilsen\nHjemmesiden`
  );

  const mailLink = `mailto:${larsEmail}?subject=${subject}&body=${body}`;

  chatBody.innerHTML += `
    <p><strong>Lars:</strong> Perfekt. Her er forespørgslen klar til Lars:</p>
    <p>
      <strong>Opgave:</strong> ${escapeHtml(chatState.task)}<br>
      <strong>Omfang:</strong> ${escapeHtml(chatState.size)}<br>
      <strong>Område:</strong> ${escapeHtml(chatState.address)}<br>
      <strong>Tidspunkt:</strong> ${escapeHtml(chatState.time)}<br>
      <strong>Kontakt:</strong> ${escapeHtml(chatState.contact)}<br>
      <strong>Ekstra:</strong> ${escapeHtml(chatState.extra)}
    </p>
    <a class="chat-action" href="${mailLink}">Send besked til Lars</a>
  `;

  chatBody.scrollTop = chatBody.scrollHeight;
}

function addChatMessage(sender, text) {
  const safeText = escapeHtml(text);
  chatBody.innerHTML += `<p><strong>${sender}:</strong> ${safeText}</p>`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
