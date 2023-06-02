//Mettre le code JavaScript lié à la page photographer.html
const logo = document.querySelector(".logo");
const modal = document.querySelector(".modal-media");
const modalContact = document.getElementById("contact_modal");
let totalLikes = 0;

// fonction de récupération des données du photographe
async function getPhotographer() {
  const id = window.location.search.split("=")[1];
  const dataJson = await fetch("../../photographers.json").then((Response) =>
    Response.json()
  );
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
async function displayPhoto(media, photographer) {
  photographer_name = photographer.name.split(" ")[0].split("-")[0];
  const listImage = document.querySelector(".list-image");
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
  console.log(filter);
  filter.innerHTML = `
    <div class="filter-content">
      <h3>Trier par</h3>
      <div name="filter" id="filter">
        <div class="title">
          <p value="popularite">Popularité</p>
          <i class="fa-solid fa-chevron-down"></i>
        </div> 
        <div class="list"> 
          <p value="date">Date</option>
          <p value="titre">Titre</p>
        </div>
      </div>
      </select>
    </div>
  `;
  document.getElementById("filter").addEventListener("click", () => {
    deployFilter();
  });
  if (document.querySelector(".list").style.display === "block") {
    document.querySelectorAll(".list p").forEach((e) => {
      e.addEventListener("click", () => {
        document.querySelector(".title p").innerHTML = e.innerHTML;
        document.querySelector(".list").style.display = "none";
        document.querySelector(".fa-chevron-down").style.rotate = "0deg";
        if (e.value === "popularite") {
          console.log("popularite");
        }
      });
    });
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
    closeModal()
  });
}

// fonction d'initialisation
async function init() {
  const { photographer, medias } = await getPhotographer();
  displayPhotographer(photographer);
  displayPhoto(medias, photographer);
  displayTotalLikes(totalLikes, photographer);
  completModalContact();
  displayFilter();
  document.querySelectorAll(".media").forEach((e) => {
    e.addEventListener("click", () => {
      modalMedia(e.parentElement);
    });
  });
}

function deployFilter() {
  document.querySelector(".list").style.display =
    document.querySelector(".list").style.display === "block"
      ? "none"
      : "block";
  document.querySelector(".fa-chevron-down").style.rotate =
    document.querySelector(".fa-chevron-down").style.rotate === "180deg"
      ? "0deg"
      : "180deg";
}

init();

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
