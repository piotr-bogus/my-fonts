(function () {
  "use strict";

  const init = () => {
    const cards = document.querySelectorAll(".card");

    if (!cards.length) return;

    cards.forEach((card) => {
      const titleEl = card.querySelector(".title-card");
      const typeEl = card.querySelector(".type-card");

      if (!titleEl || !typeEl) return;

      const className = titleEl.textContent.trim().toLowerCase().replace(/\s+/g, "-");

      card.classList.add(className);

      const fontType = typeEl.textContent.trim().toLowerCase() || "sans-serif";

      card.style.fontFamily = `'${titleEl.textContent.trim()}', ${fontType}`;
    });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(init, { timeout: 200 });
  } else {
    document.addEventListener("DOMContentLoaded", init);
    setTimeout(init, 0);
  }
})();
