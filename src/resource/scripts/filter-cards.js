const buttons = document.querySelectorAll(".container-btn-card .btn-card");
const boxes2 = document.querySelectorAll(".font");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    boxes2.forEach((box) => {
      const category = box.dataset.filter;

      if (filter === "all" || category === filter) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  });
});
