// AFSNIT 01 – Chat elementer
const chatLaunch = document.getElementById('chatLaunch');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// AFSNIT 02 – Åbn/luk chat
chatLaunch?.addEventListener('click', () => chatPanel.classList.add('open'));
chatClose?.addEventListener('click', () => chatPanel.classList.remove('open'));

// AFSNIT 03 – Send besked
function addChatMessage(text, type) {
  const p = document.createElement('p');
  p.className = type;
  p.textContent = text;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botAnswer(message) {
  const msg = message.toLowerCase();
  if (msg.includes('hæk')) return 'Det kan Lars hjælpe med. Skriv cirka længde/højde på hækken, og om affaldet skal køres væk.';
  if (msg.includes('græs')) return 'Græsslåning kan være fast aftale eller enkeltopgave. Hvor stort er arealet cirka?';
  if (msg.includes('flis')) return 'Flisearbejde kræver ofte mål og billeder. Skriv cirka m² og hvad der skal laves.';
  if (msg.includes('skilt') || msg.includes('print')) return 'Til skilte/print: skriv størrelse, materiale og hvor det skal bruges.';
  if (msg.includes('affald') || msg.includes('bort')) return 'Bortkørsel kan vurderes ud fra mængde og adgangsforhold. Beskriv gerne hvor meget der er.';
  return 'Tak. Skriv gerne lidt mere om opgaven, område og ønsket tidspunkt – så kan Lars vende tilbage.';
}

function sendChat() {
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage(message, 'user');
  chatInput.value = '';
  setTimeout(() => addChatMessage(botAnswer(message), 'bot'), 350);
}

chatSend?.addEventListener('click', sendChat);
chatInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendChat();
});
