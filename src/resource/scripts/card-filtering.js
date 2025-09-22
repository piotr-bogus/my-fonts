document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".btn-menu"));
  const cards = Array.from(document.querySelectorAll(".card"));
  const input = document.querySelector(".inp-nav");

  const setActiveStyle = (btn) => {
    buttons.forEach((b) => {
      b.style.backgroundColor = "";
      b.style.color = "";
      b.style.border = "";
      b.style.boxShadow = "";
    });
    btn.style.backgroundColor = "var(--white)";
    btn.style.color = "var(--black)";
    btn.style.border = "1px solid var(--gray)";
    btn.style.boxShadow = "var(--box-sh)";
  };

  const toggleCardVisibility = (card, visible) => {
    card.style.display = visible ? "" : "none";
  };

  const filterCardsByType = async (type) => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    cards.forEach((card) => {
      const cardType = card.querySelector(".type-card").textContent;
      toggleCardVisibility(card, type === "All" ? true : cardType === type);
    });
  };

  const handleButtonClick = (btn) => {
    const type = btn.textContent.trim();
    setActiveStyle(btn);
    filterCardsByType(type);
    input.value = "";
  };

  buttons.forEach((btn) => btn.addEventListener("click", () => handleButtonClick(btn)));

  input.addEventListener("input", () => {
    const allBtn = buttons.find((b) => b.textContent.trim() === "All");
    if (allBtn) setActiveStyle(allBtn);
  });

  const defaultBtn = buttons.find((b) => b.textContent.trim() === "All");
  if (defaultBtn) handleButtonClick(defaultBtn);
});
