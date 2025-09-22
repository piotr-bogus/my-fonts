const sortCards = () => {
  const container = document.querySelector(".container-card");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".card"));

  cards.sort((a, b) => {
    const titleA = a.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
    const titleB = b.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
    return titleA.localeCompare(titleB, "en", { sensitivity: "base" });
  });

  container.append(...cards);
};

if ("requestIdleCallback" in window) {
  requestIdleCallback(sortCards);
} else {
  document.addEventListener("DOMContentLoaded", sortCards);
}
