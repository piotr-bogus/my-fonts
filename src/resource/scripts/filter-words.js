const searchBox = document.querySelector(".search-nav");
const cards = document.querySelectorAll(".font");

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector(".title-font").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
