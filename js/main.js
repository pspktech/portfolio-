// ---------- 1. Load Navbar & Footer Partials ----------
async function loadPartial(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(path);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Failed to load ${path}`, err);
  }
}

// ---------- 2. Highlight Active Nav Link ----------
function setActiveLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    // Match root pages
    if (
      (currentPath === href) ||
      (currentPath.endsWith('/') && href === '/index.html') ||
      // Projects detail pages → highlight "Projects"
      (currentPath.includes('/projects/') && href === '/projects.html')
    ) {
      link.classList.add('active');
    }
  });
}

// ---------- 3. Mobile Menu Toggle ----------
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// ---------- 4. Footer Year ----------
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// ---------- 5. Boot ----------
document.addEventListener('DOMContentLoaded', async () => {
  // Adjust partial paths depending on folder depth
  const inSubfolder = window.location.pathname.includes('/projects/');
  const base = inSubfolder ? '../partials/' : 'partials/';

  await loadPartial('navbar-mount', `${base}navbar.html`);
  await loadPartial('footer-mount', `${base}footer.html`);

  setActiveLink();
  initMobileMenu();
  setYear();
});

// Cursor glow on project cards
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.project-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    }
  });
});
