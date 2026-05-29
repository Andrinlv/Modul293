export function initAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}