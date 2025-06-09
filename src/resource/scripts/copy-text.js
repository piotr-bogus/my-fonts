document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const text = card.getAttribute('text-to-copy');
      if (text) navigator.clipboard.writeText(text);
    });
  });
});