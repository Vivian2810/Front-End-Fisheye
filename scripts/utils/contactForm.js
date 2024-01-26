function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
  if (e.code === "KeyC") {
    displayModal();
  }
});