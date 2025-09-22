document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card"));

  if (!cards.length) return;

  const formatClassName = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9_-]/g, "");

  const addClassesAndFontAsync = async () => {
    for (const card of cards) {
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const titleCard = card.querySelector(".title-card");
      if (!titleCard) continue;

      const className = formatClassName(titleCard.textContent);
      card.classList.add(className);

      card.style.fontFamily = `"${titleCard.textContent.trim()}", sans-serif`;
    }
  };

  addClassesAndFontAsync();
});
