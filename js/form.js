export function initForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = {
      name: form.querySelector('#name'),
      email: form.querySelector('#email'),
      message: form.querySelector('#message'),
    };

    const isValid = Object.values(fields).every((field) =>
      validateField(field)
    );
    if (!isValid) return;

    // Ladestate anzeigen
    submitBtn.textContent = 'Wird gesendet…';
    submitBtn.disabled = true;

    try {

      // Option B: Eigene API / Formspree (eine Variante ist Formspree, sehr bekannt und einfach zu integrieren)
      const response = await fetch('https://formspree.io/f/...', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (!response.ok) throw new Error('Server-Fehler');

      form.reset();
      success.hidden = false;
      success.focus();
    } catch (err) {
      alert('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      console.error('Form submit error:', err);
    } finally {
      submitBtn.textContent = 'Nachricht senden';
      submitBtn.disabled = false;
    }
  });

  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('form-input--error')) validateField(input);
    });
  });
}

function validateField(field) {
  const errorEl = field.parentElement.querySelector('.form-error');
  let message = '';

  if (!field.value.trim()) {
    message = 'Dieses Feld ist erforderlich.';
  } else if (
    field.type === 'email' &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
  ) {
    message = 'Bitte gib eine gültige E-Mail-Adresse ein.';
  } else if (field.id === 'message' && field.value.trim().length < 10) {
    message = 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
  }

  const hasError = Boolean(message);
  field.classList.toggle('form-input--error', hasError);
  field.setAttribute('aria-invalid', String(hasError));
  if (errorEl) errorEl.textContent = message;

  return !hasError;
}