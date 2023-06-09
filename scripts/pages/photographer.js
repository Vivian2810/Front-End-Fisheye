//Mettre le code JavaScript lié à la page photographer.html
const logo = document.querySelector(".logo");
const modal = document.querySelector(".modal-media");
const modalContact = document.getElementById("contact_modal");
const photographer = {};
const medias = [];
let totalLikes = 0;

function displayLoading() {
  document.querySelector(".loader").style.display = "block";
  // to stop loading after some time
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 2000);
}

// fonction de récupération des données du photographe
async function getPhotographer() {
  displayLoading();
  const id = window.location.search.split("=")[1];
  const dataJson = await fetch("data/photographers.json").then(
    (Response) => Response.json()
    )
  const photographers = dataJson.photographers;
  const media = dataJson.media;
  const photographer = photographers.find(
    (photographer) => photographer.id == id
  );
  const medias = media.filter((media) => media.photographerId == id);
  return {
    photographer,
    medias,
  };
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

// fonction pour afficher les photos et les vidéos
async function displayPhoto(media, photographer, filter) {
  photographer_name = photographer.name.split(" ")[0].split("-")[0];
  const listImage = document.querySelector(".list-image");
  listImage.innerHTML = "";
  totalLikes = 0;
  media.forEach((m) => {
    let count = m.likes;
    totalLikes += m.likes;
    let article =
      `<article id="${m.id}">` +
      (m.video
        ? `<video class="media">
          <source src="assets/images/${photographer_name}/${m.video}" type="video/mp4">
        </video>`
        : `<img class="media" src="assets/images/${photographer_name}/${m.image}" alt="${m.title}">`) +
      `<div class="info">
        <h2>${m.title}</h2>
          <div class="like" id="${m.id}">
            <p>${count}</p>
            <i class="far fa-heart"></i>
          </div>
        </div>
      </article>`;
    listImage.innerHTML += article;
    document.querySelectorAll(".like").forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.toggle("liked");
        let count = parseInt(e.children[0].innerHTML);
        e.classList.contains("liked")
          ? (count++, totalLikes++)
          : (count--, totalLikes--);
        e.children[0].innerHTML = count;
        e.children[0].classList.remove("liked");
        ["far", "fas"].forEach((c) => e.children[1].classList.toggle(c));
        displayTotalLikes(totalLikes, photographer);
      });
    });
  });
}

//fonction pour afficher le nombre total de likes
function displayTotalLikes(totalLikes, photographer) {
  const totalLikesSection = document.querySelector(".total-likes");
  totalLikesSection.innerHTML = `
    <div class="like">
      <p>${totalLikes}</p>
      <i class="fas fa-heart"></i>
    </div>
    <div>
      <p>${photographer.price}€ / jour</p>
    </div>
  `;
}

function modalMedia(e) {
  modal.innerHTML = `
  <div class="modal-content">
    <i class="fa-solid fa-xmark close"></i>
    <div class="modal-media-content">
      <i class="fa-solid fa-chevron-left"></i>
      <div>
        ${e.outerHTML}
      </div> 
      <i class="fa-solid fa-chevron-right"></i>
    </div>
  </div>
  `;
  modal.style.display = "block";
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });
  changeMedia(e);
}

function changeMedia(element) {
  document.querySelectorAll(".fa-chevron-left").forEach((e) => {
    e.addEventListener("click", () => {
      modalMedia(element.previousSibling);
    });
  });
  document.querySelectorAll(".fa-chevron-right").forEach((e) => {
    e.addEventListener("click", () => {
      modalMedia(element.nextSibling);
    });
  });
}

function displayFilter() {
  const filter = document.querySelector(".filter");
  filter.innerHTML = `
    <h3 id="trierPar">Trier par </h3>
    <div class="dropdownMenu">
        <div class="filter-select">
            <a href="#" role="button" class="filter-select__trigger">
                <span>Date</span>
                <i class="fa-solid fa-chevron-down"></i>
            </a>
            <div class="filter-options-container" role="listbox" id="filter-options">
                <a href="#" class="filter-option" data-value="popularite" aria-selected="false"
                    aria-label="Trier par popularité" role="option">Popularité</a>
                <a href="#" class="filter-option selected" data-value="date" aria-selected="true"
                    aria-label="Trier par date" role="option">Date</a>
                <a href="#" class="filter-option" data-value="titre" aria-selected="false"
                    aria-label="Trier par titre" role="option">Titre</a>
            </div>
        </div>
    </div>
  `;
  const dropDownMenu = document.querySelector(".dropdownMenu ");
  const filterSelect = document.querySelector(".filter-select");
  const filterSelectTrigger = document.querySelector(".filter-select__trigger");
  const filterOptions = document.querySelectorAll(".filter-option");
  //selection du premier enfant de l'element filter select
  const firstFilterOption = document.querySelector(
    ".filter-select a:first-child"
  );
  //selection du dernier enfant de l'element filter select

  const lastFilterOption = document.querySelector(
    ".filter-select a:last-child"
  );
  // parcours le tableau filterOptions au click sur le menu dropdown
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      // si un filtre ne contient pas la classe selected alors alors selection du premier parent du filtre qui contient la classe
      // filterOptions.selected
      if (!this.classList.contains("selected")) {
        const selected = this.parentNode.querySelector(
          ".filter-option.selected"
        );

        selected.classList.remove("selected");
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");
        //  l'ancêtre le plus proche de l'élément filter-select __trigger span
        // et remplace le texte (passe le filtre selectionner en haut de liste)
        this.closest(".filter-select").querySelector(
          ".filter-select__trigger span"
        ).textContent = this.textContent;
        displayDropdown(false);
        filterMedia(this.textContent.toLowerCase());
        // displayPhoto();
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

  //
  lastFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && !e.shiftKey) {
      displayDropdown(false);
    }
  });

  firstFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && e.shiftKey) {
      displayDropdown(false);
    }
  });

  window.addEventListener("click", function (e) {
    if (!filterSelect.contains(e.target)) {
      displayDropdown(false);
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.code === "KeyF") {
      displayDropdown(
        filterSelect.classList.contains("open") === true ? false : true
      );
    }
  });

  function displayDropdown(open) {
    open === true
      ? filterSelect.classList.add("open")
      : filterSelect.classList.remove("open");
    filterSelectTrigger.setAttribute("aria-expanded", open);
    document.querySelector(".fa-chevron-down").style.rotate =
      open === true ? "180deg" : "0deg";
  }
}

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
    <button class="contact_button">Envoyer</button>
  `;
  document.querySelector(".contact_button").addEventListener("click", () => {
    closeModal();
  });
}

function filterMedia(type) {
  let filtertype = "";
  switch (type) {
    case "popularité":
      this.medias.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
      break;
    case "date":
    case "titre":
      filtertype = type === "date" ? "date" : "title";
      this.medias.sort((a, b) => {
        if (a[filtertype] < b[filtertype]) {
          return -1;
        }
        if (a[filtertype] > b[filtertype]) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      break;
  }
  displayPhoto(this.medias, this.photographer);
}

// fonction d'initialisation
async function init() {
  const { photographer: photograph, medias: allmedias } =
    await getPhotographer();
  this.photographer = photograph;
  this.medias = allmedias;
  displayPhotographer(this.photographer);
  displayPhoto(this.medias, this.photographer);
  displayTotalLikes(totalLikes, this.photographer);
  completModalContact();
  displayFilter();
  document.querySelectorAll(".media").forEach((e) => {
    e.addEventListener("click", () => {
      modalMedia(e.parentElement);
    });
  });
}

init();

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
