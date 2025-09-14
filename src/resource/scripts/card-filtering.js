(async () => {
  const whenIdle = (timeout = 200) =>
    new Promise((resolve) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => resolve(), { timeout });
      } else {
        window.addEventListener("DOMContentLoaded", () => setTimeout(resolve, 50), { once: true });
      }
    });

  try {
    await whenIdle(200);

    const btnContainer = document.querySelector(".container-btn-menu");
    const cardContainer = document.querySelector(".container-card");
    const input = document.querySelector(".inp-nav");

    if (!btnContainer || !cardContainer) {
      return;
    }

    (function injectActiveButtonStyles() {
      if (document.getElementById("card-filter-active-style")) return;
      const css = `
        .btn-menu--active {
          background-color: var(--white);
          color: var(--black);
          border-color: var(--gray);
          box-shadow: var(--box-shadow);
        }
      `;
      const style = document.createElement("style");
      style.id = "card-filter-active-style";
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    })();

    const buttons = Array.from(btnContainer.querySelectorAll(".btn-menu"));

    const cardEls = Array.from(cardContainer.querySelectorAll(".card"));
    const cache = cardEls.map((el) => {
      const typeEl = el.querySelector(".type-card");
      const typeRaw = typeEl && typeEl.textContent ? typeEl.textContent.trim() : "";
      const typeLower = typeRaw.toLowerCase();
      return { el, typeRaw, typeLower };
    });

    let activeButton = null;
    const setActiveButton = (btn) => {
      if (activeButton === btn) return;
      if (activeButton) activeButton.classList.remove("btn-menu--active");
      activeButton = btn;
      if (activeButton) activeButton.classList.add("btn-menu--active");
    };

    const showAll = () => {
      for (let i = 0; i < cache.length; i++) {
        const { el } = cache[i];
        if (el.style.display === "none") el.style.display = "";
        if (el.getAttribute("aria-hidden") === "true") el.removeAttribute("aria-hidden");
      }
    };

    const filterByType = (filterText) => {
      const q = String(filterText || "")
        .trim()
        .toLowerCase();

      if (!q || q === "all") {
        showAll();
        return;
      }

      for (let i = 0; i < cache.length; i++) {
        const { el, typeLower } = cache[i];
        if (typeLower === q) {
          if (el.style.display === "none") el.style.display = "";
          if (el.getAttribute("aria-hidden") === "true") el.removeAttribute("aria-hidden");
        } else {
          if (el.style.display !== "none") el.style.display = "none";
          el.setAttribute("aria-hidden", "true");
        }
      }
    };

    const findDefaultButton = () => {
      const byText = buttons.find((b) => {
        const txt = (b.textContent || "").trim().toLowerCase();
        return txt === "all" || txt === "wszystkie" || txt === "all";
      });
      return byText || buttons[0] || null;
    };

    btnContainer.addEventListener(
      "click",
      (ev) => {
        const target = ev.target;
        const btn = target.closest && target.closest(".btn-menu");
        if (!btn || !btnContainer.contains(btn)) return;

        const label = (btn.textContent || "").trim();

        setActiveButton(btn);

        filterByType(label);
      },
      { passive: true }
    );

    if (input) {
      input.addEventListener(
        "input",
        (ev) => {
          const val = ev.target && ev.target.value ? ev.target.value : "";
          if (val.length > 0) {
            const defaultBtn = findDefaultButton();
            if (defaultBtn) setActiveButton(defaultBtn);
          }
        },
        { passive: true }
      );
    }

    const defaultBtn = findDefaultButton();
    if (defaultBtn) {
      setActiveButton(defaultBtn);
      filterByType(defaultBtn.textContent || "All");
    } else {
      showAll();
    }
  } catch (err) {
    console.error("Błąd inicjalizacji card-filter:", err);
  }
})();
