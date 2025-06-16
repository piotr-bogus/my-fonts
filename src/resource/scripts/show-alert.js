document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup");
  const popupText = document.querySelector(".description-popup");

  let hidePopupTimeout = null;
  let removePopupTimeout = null;

  popup.style.cssText = "opacity: 0; display: none;";

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const textToCopy = card.getAttribute("text-to-copy");
    const fontName = card.querySelector(".title-card")?.textContent || "";

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).catch(console.error);

      popupText.innerHTML = `<strong>${fontName}</strong> has been copied!`;

      popup.style.display = "flex";
      popup.style.opacity = "1";

      clearTimeout(hidePopupTimeout);
      clearTimeout(removePopupTimeout);

      hidePopupTimeout = setTimeout(() => {
        popup.style.opacity = "0";
        removePopupTimeout = setTimeout(() => {
          popup.style.display = "none";
        }, 300);
      }, 3000);
    }
  });
});
