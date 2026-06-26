import { initMusic } from './music.js';
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initMusic();
  initTheme();
  initNavigation();
  initAnimations();
  initForm();

  const dateEl = document.getElementById('date');
  if (dateEl) {
    dateEl.value = new Date().toISOString().split('T')[0];
  }

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  console.log('Portfolio geladen.');
//in Porduktion unnötig, kann entfernt werden/ habe es vorerst gealssen, da es auf Github Pages ist.
});
