const THEME_KEY = 'portfolio-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ?? (prefersDark ? DARK_THEME : LIGHT_THEME);

  applyTheme(initialTheme, toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(next, toggleBtn);
    localStorage.setItem(THEME_KEY, next);
  });
}

function applyTheme(theme, toggleBtn) {
  document.body.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === DARK_THEME ? '☀️' : '🌙';
  toggleBtn.setAttribute(
    'aria-label',
    theme === DARK_THEME ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'
  );
}