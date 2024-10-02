// fonction pour afficher le modal
export let contactModalIsOpen = false;

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  contactModalIsOpen = true;
  document.querySelector(".contact_close").addEventListener("click", closeModal);
}

// fonction pour fermer le modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  contactModalIsOpen = false;
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
  if (e.code === "KeyC") {
    displayModal();
  }
});

document
  .querySelector(".contact_open_button")
  .addEventListener("click", displayModal);
