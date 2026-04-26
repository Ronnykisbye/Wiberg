// AFSNIT 01 – Mobilmenu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// AFSNIT 02 – Luk mobilmenu ved klik
mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

console.log('Lars Wiberg website loaded OK');
