document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-nav");
  const cards = document.querySelectorAll(".card");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector(".title-card").textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
