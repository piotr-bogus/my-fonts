let timeoutId;

const boxes = document.querySelectorAll(".font");

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");
    const titleElement = box.querySelector(".title-font");

    if (!titleElement || !popupText || !popup) return;

    const title = titleElement.textContent.trim();

    popupText.innerHTML = `You just copied the <strong>${title}</strong> font!`;

    popup.classList.add("show");

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  });
});
