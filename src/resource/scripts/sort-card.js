document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-card");
  if (!container) return;

  const cards = Array.from(container.children);

  cards.sort((a, b) => {
    const titleA = a.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
    const titleB = b.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
    return titleA.localeCompare(titleB);
  });

  const fragment = document.createDocumentFragment();
  cards.forEach((card) => fragment.appendChild(card));
  container.appendChild(fragment);
});
