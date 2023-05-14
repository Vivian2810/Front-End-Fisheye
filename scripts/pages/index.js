async function getPhotographers() {
  const dataJson = await fetch("../../photographers.json").then((Response) =>
    Response.json()
  );
  const photographers = dataJson.photographers;
  const media = dataJson.media;
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
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
