//Mettre le code JavaScript lié à la page photographer.html
const logo = document.querySelector(".logo");
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

function modalMedia() {
  document.querySelectorAll(".media").forEach((e) => {
    e.addEventListener("click", () => {
      console.log(e, e.outerHTML);
      const modal = document.querySelector(".modal-media");
      modal.innerHTML = `
        <div class="modal-content">
          <i class="fa-solid fa-xmark close"></i>
          <div class="modal-media-content">
            <i class="fa-solid fa-chevron-left"></i>
            <div>
              ${e.outerHTML}
              <p>${e.alt}</p>
            </div> 
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      `;
      modal.style.display = "block";
      document.querySelector(".close").addEventListener("click", () => {
        console.log("close");
        modal.style.display = "none";
        console.log(modal.classList);
      });
      changeMedia();
    });
  });
}

function changeMedia() {
  document.querySelectorAll(".fa-chevron-left").forEach((e) => {
    e.addEventListener("click", () => {
      console.log(e);
      e = e.parentElement.previousSibling;
    });
  });
  document.querySelectorAll(".fa-chevron-right").forEach((e) => {
    e.addEventListener("click", () => {
      console.log(e);
      e = e.parentElement.nextSibling;
    });
  });
  modalMedia()
}

// fonction d'initialisation
async function init() {
  const { photographer, medias } = await getPhotographer();
  displayPhotographer(photographer);
  displayPhoto(medias, photographer);
  displayTotalLikes(totalLikes, photographer);
  modalMedia();
}

init();

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
