import { getData } from "../utils/fetchData.js";

let photographer_name = "";
export let totalLikes = 0;
const listMedia = await getData().then((data) => data.media );

export function displayModalMedia(idMedia, photograph) {
  let mediaElement = "";
  photographer_name = photograph.name.split(" ")[0].split("-")[0];
  let media = listMedia.filter(m => m.photographerId === photograph.id).find((m) => m.id == idMedia);
  if (!!media.image) {
    mediaElement = `
            <img src='assets/images/${photographer_name}/${media.image}' alt='${media.alt}'>
            <p>${media.title}</p>
        `;
  } else if (media.video) {
    mediaElement = `
            <video controls>
                <source src='assets/images/${photographer_name}/${media.video}' type='video/mp4'>
                Your browser does not support the video tag.
            </video>
            <p>${media.title}</p>
        `;
  }
  document.querySelector(".content-modal").innerHTML = mediaElement;
}

// fonction d'affiage des médias
export function displayMedia(listMedia, photographer) {
  photographer_name = photographer.name.split(" ")[0].split("-")[0];
  const listImage = document.querySelector(".list-image");
  totalLikes = 0;
  listImage.innerHTML = "";
  listMedia.forEach((m) => {
    let count = m.likes;
    totalLikes += m.likes;
    listImage.innerHTML +=
      `<article id="${m.id}">` +
      (m.video
        ? `<video id=${m.id}  class="media">
          <source src="assets/images/${photographer_name}/${m.video}" type="video/mp4">
        </video>`
        : `<img id=${m.id} class="media" src="assets/images/${photographer_name}/${m.image}" alt="${m.title}">`) +
      `<div class="info">
        <h2>${m.title}</h2>
          <div class="like" id="${m.id}">
            <p>${count}</p>
            <i class="far fa-heart"></i>
          </div>
        </div>
      </article>`;
    document.querySelectorAll(".like").forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.toggle("liked");
        let count = parseInt(e.children[0].innerHTML);
        e.classList.contains("liked")
          ? (count++, totalLikes++)
          : (count--, totalLikes--);
        e.children[0].innerHTML = count;
        ["far", "fas"].forEach((c) => e.children[1].classList.toggle(c));
        displayTotalLikes(photographer);
      });
    });
  });
}

export function displayTotalLikes(photographer) {
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
