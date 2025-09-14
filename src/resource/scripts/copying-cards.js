(function () {
  "use strict";

  const fallbackCopyText = (text) => {
    const ta = document.createElement("textarea");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.left = "-9999px";
    ta.setAttribute("aria-hidden", "true");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  };

  const copyText = async (text) => {
    if (typeof text !== "string" || text.length === 0) return false;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {}
    }
    return fallbackCopyText(text);
  };

  const whenIdle = (timeout = 200) =>
    new Promise((resolve) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => resolve(), { timeout });
      } else {
        if (document.readyState === "complete" || document.readyState === "interactive") {
          setTimeout(resolve, 50);
        } else {
          window.addEventListener("DOMContentLoaded", () => setTimeout(resolve, 50), { once: true });
        }
      }
    });

  (async function init() {
    await whenIdle(200);

    const container = document.querySelector(".container-card");
    if (!container) return;

    container.addEventListener(
      "click",
      (ev) => {
        const card = ev.target && ev.target.closest ? ev.target.closest(".card") : null;
        if (!card || !container.contains(card)) return;

        const dataAttr = card.dataset ? card.dataset.textToCopy : card.getAttribute("data-text-to-copy");
        if (!dataAttr) return;

        copyText(String(dataAttr)).catch(() => {});
      },
      false
    );
  })();
})();
