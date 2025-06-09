document.addEventListener("DOMContentLoaded", function () {
  const containerBtnMenu = document.querySelector(".container-btn-menu");
  const cards = document.querySelectorAll(".card");

  const categories = new Set();
  cards.forEach((card) => {
    const category = card.dataset.category;
    if (category) categories.add(category);
  });

  const existingButtons = containerBtnMenu.querySelectorAll(".btn-menu");
  existingButtons.forEach((btn, index) => {
    if (index > 0) btn.remove();
  });

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "btn-menu";
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    button.tabIndex = 0;
    containerBtnMenu.appendChild(button);
  });

  containerBtnMenu.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-menu")) {
      const buttons = containerBtnMenu.querySelectorAll(".btn-menu");
      const category = e.target.textContent.toLowerCase();

      buttons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      cards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });

  containerBtnMenu.querySelector(".btn-menu").click();
});
