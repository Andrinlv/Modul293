function detectCountry() {
  try {
    // 1. Versuch: Über die Zeitzone des Systems
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Zurich')) return 'CH';
    if (timezone.includes('Berlin')) return 'DE';
    if (timezone.includes('Vienna')) return 'AT';
    if (timezone.includes('America')) return 'US';

    // 2. Versuch: Fallback über die eingestellte Browsersprache
    const lang = navigator.language || '';
    if (lang.includes('-CH')) return 'CH';
    if (lang.includes('-DE')) return 'DE';
    if (lang.includes('-AT')) return 'AT';
  } catch (e) {
    console.warn('Ländererkennung fehlgeschlagen:', e);
  }
  return 'CH';
}

export function initForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const countrySelect = form.querySelector('#country');
  if (countrySelect) {
    countrySelect.value = detectCountry();
  }

  const addressInput = document.getElementById('address');
  const mapIframe = document.getElementById('mapIframe');
  const addressCheckbox = document.getElementById('addressCheckbox');

  function updateMap() {
    if (!addressInput || !mapIframe || !addressCheckbox) return;
    const address = addressInput.value.trim();

    // Nur aktualisieren, wenn Text vorhanden ist und die Checkbox aktiv ist
    if (address && addressCheckbox.checked) {
      const encodedAddress = encodeURIComponent(address);
      mapIframe.src = `https://maps.google.com/maps?q=$${encodedAddress}&output=embed`;
    }
  }

  if (addressInput && mapIframe && addressCheckbox) {
    // Wenn der Nutzer die Adresse fertig eingetippt hat (Feld verlässt oder Enter drückt)
    addressInput.addEventListener('change', updateMap);

    // Wenn der Nutzer die Checkbox klickt (aktiviert/deaktiviert)
    addressCheckbox.addEventListener('change', () => {
      if (addressCheckbox.checked) {
        updateMap();
      } else {
        // Fallback-Ort, wenn die Checkbox abgewählt wird
        mapIframe.src = 'https://maps.google.com/maps?q=Schweiz&output=embed';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = {
      date: form.querySelector('#date'),
      sex: form.querySelector('#sex'),
      name: form.querySelector('#name'),
      age: form.querySelector('#age'),
      email: form.querySelector('#email'),
      country: form.querySelector('#country'),
      phone: form.querySelector('#phone'),
      message: form.querySelector('#message'),
      address: form.querySelector('#address'),
    };

    const isValid = Object.values(fields).every((field) =>
      validateField(field)
    );
    if (!isValid) return;

    submitBtn.textContent = 'Wird gesendet…';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/mqeoozrb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (!response.ok) throw new Error('Server-Fehler');

      form.reset();

      // Nach dem Reset das Land wieder automatisch setzen
      if (countrySelect) countrySelect.value = detectCountry();
      // Karte nach Reset auf Standard zurücksetzen
      if (mapIframe)
        mapIframe.src = 'https://maps.google.com/maps?q=Schweiz&output=embed';

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

// 3. HELFERFUNKTION: VALIDIERUNG
function validateField(field) {
  if (!field) return true;

  const errorEl = field.closest('.form-group')?.querySelector('.form-error');
  let message = '';

  if (!field.value.trim()) {
    if (field.required) {
      message = 'Dieses Feld ist erforderlich.';
    }
  } else {
    if (
      field.type === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    ) {
      message = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    } else if (
      field.id === 'phone' &&
      !/^\+?[0-9\s\-()]{7,}$/.test(field.value)
    ) {
      message = 'Bitte gib eine gültige Telefonnummer ein.';
    } else if (field.id === 'age' && (field.value < 16 || field.value > 120)) {
      message = 'Du musst mindestens 16 sein.';
    } else if (field.id === 'message' && field.value.trim().length < 10) {
      message = 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
    }
  }

  const hasError = Boolean(message);
  field.classList.toggle('form-input--error', hasError);
  field.setAttribute('aria-invalid', String(hasError));
  if (errorEl) errorEl.textContent = message;

  return !hasError;
}
