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

async function displayPhoto(media, photographer) {
  photographer_name = photographer.name.split(" ")[0].split("-")[0];
  const listImage = document.querySelector(".list-image");
  console.log(listImage);
  media.forEach((m) => {
    const { image, title, likes, date, price } = m
    const article = `
    <article>
      <img src="assets/images/${photographer_name}/${image}" alt="${title}">
      <div class="info">
        <h2>${title}</h2>
        <div class="like">
          <p>${likes}</p>
          <i class="fas fa-heart"></i>
        </div>
      </div>
      <div class="price">
        <p>${price}€</p>
      </div>
    </article>
  `;
    console.log(article);
    listImage.innerHTML += article;
  });
}

async function init() {
  const { photographer, medias } = await getPhotographer();
  console.log(medias);
  displayPhoto(medias, photographer);
}

init();
