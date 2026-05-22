import { throttle } from './utils.js';

export function initNavigation() {
  initStickyHeader();
  initBurgerMenu();
  initActiveLinks();
}

function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = throttle(() => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 50);
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

function initBurgerMenu() {
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.querySelector('.nav__links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('nav__links--open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navLinks.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav__links--open');
      document.body.classList.remove('menu-open');
    });
  });
}

function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('nav__link--active', isActive);
          link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}