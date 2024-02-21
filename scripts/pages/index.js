// fonction de récupértaion des données des photographes
async function getPhotographers() {
  // document.querySelector(".loader").style.display = "block";
  const dataJson = await fetch("/data/photographers.json").then(
    (Response) => Response.json()
  );
  const photographers = dataJson.photographers;
  const media = dataJson.media;
  return {
    photographers,
    media,
  };

}

// fonction pour afficher les photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.innerHTML += userCardDOM;
  });
}

// fonction d'initialisation de la page avec le loader
async function init() {
  document.querySelector(".loader").style.display = "block";
  const { photographers } = await getPhotographers();
  displayData(photographers);
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 2000);
}

init();
