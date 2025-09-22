document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".inp-nav");
  const cards = Array.from(document.querySelectorAll(".card"));

  const toggleCardVisibility = (card, visible) => {
    card.style.display = visible ? "" : "none";
  };

  const debounce = (fn, delay = 200) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const filterCards = async (query) => {
    const normalizedQuery = query.trim().toLowerCase();

    await new Promise((resolve) => requestAnimationFrame(resolve));

    cards.forEach((card) => {
      const title = card.querySelector(".title-card").textContent.toLowerCase();
      toggleCardVisibility(card, title.includes(normalizedQuery));
    });
  };

  const handleInput = debounce((e) => {
    filterCards(e.target.value);
  }, 200);

  input.addEventListener("input", handleInput);
});
