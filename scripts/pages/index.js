
async function getPhotographers() {
  // document.querySelector(".loader").style.display = "block";
  const dataJson = await fetch("/data/photographers.json").then(
    (Response) => Response.json()
  );
  const photographers = dataJson.photographers;
  const media = dataJson.media;
  // document.querySelector(".loader").style.display = "none";
  return {
    photographers,
    media,
  };

}

function displayLoading() {
  document.querySelector(".loader").style.display = "block";
  // to stop loading after some time
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 2000);
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
  displayLoading();
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
