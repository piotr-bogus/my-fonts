document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const popup = document.querySelector(".popup");
  const popupText = document.querySelector(".description-popup");
  let timeoutId = null;

  popup.style.opacity = "0";
  popup.style.display = "none";

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const textToCopy = this.getAttribute("text-to-copy");
      const fontName = this.querySelector(".title-card").textContent;

      navigator.clipboard.writeText(textToCopy);

      popupText.innerHTML = `<strong>${fontName}</strong> has been copied!`;

      popup.style.display = "flex";
      setTimeout(() => {
        popup.style.opacity = "1";
      }, 10);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.style.display = "none";
          timeoutId = null;
        }, 300);
      }, 3000);
    });
  });
});
