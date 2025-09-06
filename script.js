/* ===== Helpers ===== */
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));

/* ===== Year in footer ===== */
$('#year').textContent = new Date().getFullYear();

/* ===== Theme toggle ===== */
const themeToggle = $('#themeToggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme) document.body.className = storedTheme;

const setIcon = () => {
  const dark = document.body.classList.contains('theme-dark');
  themeToggle.textContent = dark ? '☀️' : '🌙';
};
setIcon();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
  document.body.classList.toggle('theme-light');
  localStorage.setItem('theme', document.body.className);
  setIcon();
});

/* ===== Mobile nav ===== */
const hamburger = $('#hamburger');
const nav = $('#nav');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

/* ===== Scroll reveal ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('inview');
      if (e.target.classList.contains('card')) e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.16 });

$$('.section .container > *').forEach(el => io.observe(el));

/* ===== Projects (custom selection) ===== */
const projectsGrid = $('#projectsGrid');

const localProjects = [
  { 
    title: 'Recipe Search Website', 
    desc: 'Search and explore recipes by ingredients with a responsive UI.', 
    link: 'https://github.com/Diksha-Ingawale/Recipe-Search-Website', 
    tags: ['HTML','CSS','JS'], 
    icon: '🍳' 
  },
  { 
    title: 'Personal Portfolio', 
    desc: 'A personal portfolio website showcasing skills and projects.', 
    link: 'https://github.com/Diksha-Ingawale/Personal-portfolio', 
    tags: ['HTML','CSS','JS'], 
    icon: '🎨' 
  },
  { 
    title: 'Chatbot', 
    desc: 'An intelligent and interactive chatbot built with HTML, CSS, and JavaScript, designed to provide real-time conversational experiences.', 
    link: 'https://github.com/Diksha-Ingawale/chatbot', 
    tags: ['JavaScript', 'Web App', 'AI'], 
    icon: '🤖' 
  },
  
  { 
    title: 'AI Assistant', 
    desc: 'An interactive AI Assistant project built for automation and fun.', 
    link: 'https://github.com/Diksha-Ingawale/AI-Assistant', 
    tags: ['HTML','CSS','JS'], 
    icon: '🧠' 
  }
];

function cardTemplate({ title, desc, link, tags = [], icon = '⭐' }){
  return `
    <article class="card">
      <div class="icon">${icon}</div>
      <h3>${title}</h3>
      <p>${desc ?? 'No description provided.'}</p>
      <div class="card-actions">
        <a class="link" href="${link}" target="_blank" rel="noreferrer">Open →</a>
        ${tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
    </article>
  `;
}

function loadProjects(){
  projectsGrid.innerHTML = localProjects.map(cardTemplate).join('');
  $$('.card', projectsGrid).forEach(el => io.observe(el));
}
loadProjects();

/* ===== Contact form validation ===== */
const form = $('#contactForm');
const success = $('#formSuccess');
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(id, msg=''){
  const el = $(`.error[data-for="${id}"]`);
  if (el) el.textContent = msg;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();

  let ok = true;
  if (!name){ setError('name','Name is required'); ok = false; } else setError('name');
  if (!email){ setError('email','Email is required'); ok = false; }
  else if (!emailRx.test(email)){ setError('email','Enter a valid email'); ok = false; }
  else setError('email');
  if (!message){ setError('message','Message is required'); ok = false; } else setError('message');

  if (!ok) return;

  success.textContent = '✅ Thanks! Your message was sent.';
  form.reset();
  setTimeout(()=> success.textContent = '', 4000);
});
