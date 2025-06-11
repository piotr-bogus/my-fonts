document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup");
  const popupText = document.querySelector(".description-popup");
  let timeoutId = null;

  Object.assign(popup.style, {
    opacity: "0",
    display: "none",
  });

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const textToCopy = card.getAttribute("text-to-copy");
    const fontName = card.querySelector(".title-card").textContent;

    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy text: ", err);
    });

    popupText.innerHTML = `<strong>${fontName}</strong> has been copied!`;

    popup.style.display = "flex";
    popup.style.opacity = "1";

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      popup.style.opacity = "0";
      timeoutId = setTimeout(() => {
        popup.style.display = "none";
      }, 300);
    }, 3000);
  });
});
