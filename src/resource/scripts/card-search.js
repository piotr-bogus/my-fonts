const debounce = (fn, delay) => {
  let t = null;
  return function debounced(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(this, args);
    }, delay);
  };
};

const whenIdle = (timeout = 200) =>
  new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => resolve(), { timeout });
    } else {
      setTimeout(resolve, 50);
    }
  });

(async function initCardFilter() {
  try {
    await whenIdle(200);

    const input = document.querySelector(".inp-nav");
    const container = document.querySelector(".container-card");

    if (!input || !container) {
      return;
    }

    const cardElements = Array.prototype.slice.call(container.querySelectorAll(".card"));

    const cache = cardElements.map((el) => {
      const titleEl = el.querySelector(".title-card");
      const titleRaw = titleEl && titleEl.textContent ? titleEl.textContent.trim() : "";
      const titleLower = titleRaw.toLowerCase();
      return { el, titleRaw, titleLower };
    });

    const doFilter = (rawQuery) => {
      const q = (rawQuery || "").trim().toLowerCase();

      if (!q) {
        for (let i = 0; i < cache.length; i++) {
          const item = cache[i];
          if (item.el.style.display === "" || item.el.style.display === "block" || item.el.style.display === "flex" || item.el.style.display === "grid") {
          } else {
            item.el.style.display = "";
          }
        }
        return;
      }

      for (let i = 0; i < cache.length; i++) {
        const item = cache[i];
        if (item.titleLower.indexOf(q) !== -1) {
          if (item.el.style.display !== "") {
            item.el.style.display = "";
          }
        } else {
          if (item.el.style.display !== "none") {
            item.el.style.display = "none";
          }
        }
      }
    };

    const debouncedHandler = debounce((ev) => {
      const value = ev && ev.target && ev.target.value ? ev.target.value : "";
      doFilter(value);
    }, 200);

    input.addEventListener("input", debouncedHandler, { passive: true });

    input.addEventListener(
      "keydown",
      function (ev) {
        if (!ev) return;
        if (ev.key === "Escape" || ev.key === "Esc" || ev.keyCode === 27) {
          if (input.value !== "") {
            input.value = "";
            doFilter("");
          }
        }
      },
      { passive: true }
    );

    doFilter("");
  } catch (err) {
    console.error("Błąd inicjalizacji filtrowania kart:", err);
  }
})();
