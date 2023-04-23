//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographer() {
  const id = window.location.search.split("=")[1];
  const dataJson = await fetch("/data/photographers.json").then((Response) =>
    Response.json()
  );
  const photographers = dataJson.photographers;
  const media = dataJson.media;
  const photographer = photographers.find(
    (photographer) => photographer.id == id
  );
  const medias = media.filter((media) => media.photographerId == id);
  console.log(photographer, medias);
  return {
    photographer,
    medias,
  };
}

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

async function displayPhoto(media, photographer) {
  photographer_name = photographer.name.split(" ")[0].split("-")[0];
  const listImage = document.querySelector(".list-image");
  console.log(listImage);
  media.forEach((m) => {
    const { video, image, title, likes, date, price } = m;
    let article = "";
    if (video) {
      article = `
        <article>
          <video controls>
            <source src="assets/images/${photographer_name}/${video}" type="video/mp4">
          </video>
          <div class="info">
            <h2>${title}</h2>
            <div class="like">
              <p>${likes}</p>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </article>
      `;
    } else {
      article = `
        <article>
          <img src="assets/images/${photographer_name}/${image}" alt="${title}">
          <div class="info">
            <h2>${title}</h2>
            <div class="like">
              <p>${likes}</p>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </article>
      `;
    }
    // console.log(article);
    listImage.innerHTML += article;
  });
}

async function init() {
  const { photographer, medias } = await getPhotographer();
  console.log(medias);
  displayPhotographer(photographer);
  displayPhoto(medias, photographer);
}

init();
