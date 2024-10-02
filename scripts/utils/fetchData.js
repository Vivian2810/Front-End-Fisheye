const allData = await getData();

export async function getData() {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data;
}

export async function getPhotographerById(id) {
  return allData.photographers.find((photographer) => photographer.id == id);
}

export async function getMediaByPhotographerId(id) {
  return allData.media.filter((media) => media.photographerId == id);
}

export async function getMediaById(id) {
  return allData.media.find((media) => media.id == id);
}
