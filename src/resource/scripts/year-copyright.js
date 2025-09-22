document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector(".year-copyright");

  yearElement.textContent = new Date().getFullYear();
});
