document.addEventListener("DOMContentLoaded", async () => {
  try {
    const runSort = () => {
      const container = document.querySelector(".container-card");
      if (!container) return;

      const cards = Array.from(container.querySelectorAll(".card"));

      cards.sort((a, b) => {
        const titleA = a.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
        const titleB = b.querySelector(".title-card")?.textContent.trim().toLowerCase() || "";
        return titleA > titleB ? 1 : -1;
      });

      cards.forEach((card) => container.appendChild(card));
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(runSort, { timeout: 200 });
    } else {
      setTimeout(runSort, 0);
    }
  } catch (err) {
    console.error("Błąd sortowania kart:", err);
  }
});
