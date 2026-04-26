// AFSNIT 01 – Kontaktformular demo
const leadForm = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = 'Udfyld navn, email og beskrivelse.';
    return;
  }

  const lead = { name, email, service, message, createdAt: new Date().toISOString() };
  localStorage.setItem('latestLead', JSON.stringify(lead));

  formNote.textContent = 'Tak – din forespørgsel er modtaget i demoen.';
  leadForm.reset();
});
