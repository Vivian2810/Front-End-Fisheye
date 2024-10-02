//Mettre le code JavaScript lié à la page photographer.html
import { Photographer } from "../models/Photographer.js";
import { Photo } from "../models/Photo.js";
import {
  getPhotographerById,
  getMediaByPhotographerId,
} from "../utils/fetchData.js";
import {
  displayMedia,
  displayModalMedia,
  displayTotalLikes,
} from "../factories/media.js";
import { contactModalIsOpen } from "../utils/contactForm.js";

const logo = document.querySelector(".logo");
const modal = document.querySelector(".modal-media");
const modalContact = document.getElementById("contact_modal");
let currentphotographer = {};
let listMedia = [];
let idCurrentMedia = null;

// fonction de récupération des données du photographe
async function getPhotographer() {
  document.querySelector(".loader").style.display = "block";
  const id = window.location.search.split("=")[1];
  const photographer = new Photographer(await getPhotographerById(id));
  const medias = await getMediaByPhotographerId(id).then((data) =>
    data.map((media) => new Photo(media))
  );
  document.querySelector(".loader").style.display = "none";
  return {
    photographer,
    medias,
  };
}

// fonction d'initialisation de la modale de constact
function completModalContact() {
  modalContact.childNodes[1].childNodes[3].innerHTML = `
    <div>
      <label>Prénom</label>
      <input type="text" name="firstname" id="firstname" required>
      <label>Nom</label>
      <input type="text" name="name" id="name" required>
      <label>Email</label>
      <input type="email" name="email" id="email" required>
      <label>Message</label>
      <textarea name="message" id="message" cols="30" rows="10" required></textarea>
    </div>
    <button class="contact_valid_button contact_button">Envoyer</button>
  `;
  document
    .querySelector(".contact_valid_button")
    .addEventListener("click", () => {
      modalContact.childNodes[1].childNodes[3].innerHTML = `
      <div class="contact_valid">
        <h2>Merci !</h2>
        <p>Votre message a bien été envoyé à ${this.photographer.name}</p>
      </div>
    `;
    });
}

// fonction pour afficher les informations du photographe
async function displayPhotographer(photographer) {
  const { name, city, country, tagline, price, portrait } = photographer;
  const photographerSection = document.querySelector(".photograph-header");
  const photographInfo = document.createElement("div");
  const photographImg = document.createElement("img");
  photographInfo.classList.add("photograph-info");
  photographImg.src = `assets/photographers/${portrait}`;
  photographImg.alt = name;
  photographInfo.innerHTML = `
    <h2>${name}</h2>
    <div class="info">
      <p class="city">${city}, ${country}</p>
      <p class="tagline">${tagline}</p>
    </div>
  `;
  photographerSection.prepend(photographInfo);
  photographerSection.append(photographImg);
}

//fonction pour afficher les photos
async function modalMedia(e) {
  idCurrentMedia = e;
  modal.innerHTML = `
  <div class="modal-content">
    <i class="fa-solid fa-xmark close"></i>
    <div class="modal-media-content">
      <i class="fa-solid chevron fa-chevron-left"></i>
      <div class="content-modal">
      </div> 
      <i class="fa-solid chevron fa-chevron-right"></i>
      </div>
      </div>
      `;
  modal.style.display = "block";
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });
  displayModalMedia(e, currentphotographer);
  changeMedia();
}

// fonction pour changer de média
function changeMedia() {
  let index = listMedia.findIndex((m) => m.id == idCurrentMedia);

  function updateMedia(direction) {
    index = direction === "left" ? index - 1 : index + 1;
    displayModalMedia(listMedia[index]?.id, currentphotographer);
    idCurrentMedia = listMedia[index]?.id;
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" && index > 0) {
      updateMedia("left");
    }
    if (e.code === "ArrowRight" && index < listMedia.length - 1) {
      updateMedia("right");
    }
  });

  document.querySelectorAll(".chevron").forEach((chevron) => {
    chevron.addEventListener("click", () => {
      const direction = chevron.classList.contains("fa-chevron-left")
        ? "left"
        : "right";
      if (
        (direction === "left" && index > 0) ||
        (direction === "right" && index < listMedia.length - 1)
      ) {
        updateMedia(direction);
      }
    });
  });
}
// fonction d'affichage des filtres
function displayFilter() {
  const filter = document.querySelector(".filter");
  filter.innerHTML = `
    <h3 id="trierPar">Trier par </h3>
    <div class="dropdownMenu tooltip">
    <span class="tooltiptext">F pour ouvrir</span>
        <div class="filter-select">
            <a href="#" role="button" class="filter-select__trigger">
                <span>Date</span>
                <i class="fa-solid fa-chevron-down"></i>
            </a>
            <div class="filter-options-container" role="listbox" id="filter-options">
                <a href="#" class="filter-option" data-value="popularite" aria-selected="false" aria-label="Trier par popularité" role="option">Popularité</a>
                <a href="#" class="filter-option selected" data-value="date" aria-selected="true" aria-label="Trier par date" role="option">Date</a>
                <a href="#" class="filter-option" data-value="titre" aria-selected="false" aria-label="Trier par titre" role="option">Titre</a>
            </div>
        </div>
    </div>
  `;
  const dropDownMenu = document.querySelector(".dropdownMenu ");
  const filterSelect = document.querySelector(".filter-select");
  const filterOptions = document.querySelectorAll(".filter-option");
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      if (!this.classList.contains("selected")) {
        filterOptions.forEach((e) => {
          e.classList.remove("selected");
          e.setAttribute("aria-selected", "false");
        });
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");
        this.closest(".filter-select").querySelector(
          ".filter-select__trigger span"
        ).textContent = this.textContent;
        filterMedia(this.textContent.toLowerCase());
      }
    });
  }

  // au click sur le menu dropdown
  dropDownMenu.addEventListener("click", function (e) {
    e.preventDefault();
    displayDropdown(
      filterSelect.classList.contains("open") === true ? false : true
    );
  });

  window.addEventListener("keydown", function (e) {
    if (e.code === "KeyF" && !contactModalIsOpen) {
      displayDropdown(
        filterSelect.classList.contains("open") === true ? false : true
      );
    }
  });

  function displayDropdown(open) {
    open === true
      ? filterSelect.classList.add("open")
      : filterSelect.classList.remove("open");
    document
      .querySelector(".filter-select__trigger")
      .setAttribute("aria-expanded", open);
    document.querySelector(".fa-chevron-down").style.rotate =
      open === true ? "180deg" : "0deg";
  }
}

// fonction de de filtre
function filterMedia(type) {
  const filtertype = type === "titre" ? "title" : type;
  listMedia.sort((a, b) => {
    if (
      type === "popularité" ? a.likes < b.likes : a[filtertype] > b[filtertype]
    ) {
      return 1;
    }
    if (
      type === "popularité" ? a.likes > b.likes : a[filtertype] < b[filtertype]
    ) {
      return -1;
    }
    return 0;
  });
  displayMedia(listMedia, currentphotographer);
  document.querySelectorAll(".media").forEach((e) => {
    e.addEventListener("click", () => {
      modalMedia(e.id);
    });
  });
}

// fonction pour ajouter les écouteurs d'événements
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modalContact.style.display = "none";
  }
  if (e.code === "KeyC" && !contactModalIsOpen) {
    modalContact.style.display = "block";
  }
});

let closeContact = document.getElementsByClassName(".close-contact");
if (closeContact.length > 0)
  closeContact.addEventListener("click", () => {
    modalContact.style.display = "none";
  });

let closeModal = document.getElementsByClassName(".close-modal");
if (closeModal.length > 0)
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

function displayDropdown(open) {
  open === true
    ? document.querySelector(".filter-select").classList.add("open")
    : document.querySelector(".filter-select").classList.remove("open");
  document
    .querySelector(".filter-select__trigger")
    .setAttribute("aria-expanded", open);
  document.querySelector(".fa-chevron-down").style.transform =
    open === true ? "rotate(180deg)" : "rotate(0deg)";
}

// fonction d'initialisation
async function init() {
  const data = await getPhotographer();
  currentphotographer = data.photographer;
  listMedia = data.medias;
  displayPhotographer(currentphotographer);
  filterMedia("date");
  displayTotalLikes(data.photographer);
  completModalContact();
  displayFilter();
}

init();

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
