document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-card");
  if (!container) return;

  container.addEventListener("click", async (event) => {
    const card = event.target.closest(".card");
    if (!card) return;

    const textToCopy = card.getAttribute("text-to-copy");
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Nie udało się skopiować tekstu:", err);
    }
  });
});
