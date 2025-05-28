const copyButtons = document.querySelectorAll(".font");

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const textToCopy = button.getAttribute("text-to-copy");

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  });
});
