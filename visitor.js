(function () {
  const valueEl = document.querySelector('[data-visitor-count]');
  if (!valueEl) return;

  const container = valueEl.closest('.visitor-counter');
  valueEl.textContent = '…';

  fetch('/.netlify/functions/visitor', { headers: { Accept: 'application/json' } })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Request failed'))))
    .then((data) => {
      if (data && typeof data.count === 'number') {
        valueEl.textContent = data.count.toLocaleString('en-US');
        return;
      }
      throw new Error('Invalid payload');
    })
    .catch(() => {
      valueEl.textContent = '—';
      if (container) {
        container.title = 'Could not load visitor count';
      }
    });
})();
