document.addEventListener("DOMContentLoaded", () => {
  const containerBtnMenu = document.querySelector(".container-btn-menu");
  const cards = document.querySelectorAll(".card");

  const categories = [...new Set([...cards].map((card) => card.dataset.category).filter(Boolean))];

  containerBtnMenu.querySelectorAll(".btn-menu:not(:first-child)").forEach((btn) => btn.remove());

  const fragment = document.createDocumentFragment();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "btn-menu";
    button.textContent = category[0].toUpperCase() + category.slice(1);
    button.tabIndex = 0;
    fragment.appendChild(button);
  });
  containerBtnMenu.appendChild(fragment);

  containerBtnMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("btn-menu")) return;

    const category = target.textContent.toLowerCase();

    containerBtnMenu.querySelectorAll(".btn-menu.active").forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    cards.forEach((card) => {
      card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
    });
  });

  const firstButton = containerBtnMenu.querySelector(".btn-menu");
  if (firstButton) firstButton.click();
});
