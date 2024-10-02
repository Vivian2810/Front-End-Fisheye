import { getData } from "../utils/fetchData.js";
import { Photographer } from "../models/Photographer.js";
import { photographerFactory } from "../factories/photographer.js";

// fonction de récupértaion des données des photographes
async function getPhotographers() {
  const data = await getData();
  return {
    photographers: data.photographers.map((photographer) => new Photographer(photographer)),
    media: data.media,
  };
}

// fonction pour afficher les photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    photographersSection.innerHTML += photographerFactory(photographer).article;
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
