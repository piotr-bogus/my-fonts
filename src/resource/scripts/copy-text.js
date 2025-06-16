document.addEventListener("DOMContentLoaded", () => {
  const container = document.body;

  container.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;

    const text = card.getAttribute("text-to-copy");
    if (text && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch((err) => {
        console.error("Clipboard copy failed:", err);
      });
    }
  });
});
