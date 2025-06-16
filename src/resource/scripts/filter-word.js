document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-nav");
  const cards = document.querySelectorAll(".card");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const titleElement = card.querySelector(".title-card");
      const title = titleElement?.textContent?.toLowerCase() || "";
      card.style.display = title.includes(searchTerm) ? "block" : "none";
    });
  });
});
