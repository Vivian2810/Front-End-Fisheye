async function getPhotographers() {
  const dataJson = await fetch("../../photographers.json").then((Response) =>
    Response.json()
  );
  const photographers = dataJson.photographers;
  const media = dataJson.media;
  // fetch('/data/photographers.json ').then(Response => Response.json()).then(data => console.log(data));
  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers,
    media,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
