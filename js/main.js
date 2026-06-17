import { initMusic } from './music.js'; // Geändert!
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initMusic(); // Hier aufrufen
  initTheme();
  initNavigation();
  initAnimations();
  initForm();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  console.log('Portfolio geladen.');
});
