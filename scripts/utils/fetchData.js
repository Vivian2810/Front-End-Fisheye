export async function getData() {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data;
}

export async function getPhotographerById(id) {
  const data = await getData();
  return data.photographers.find((photographer) => photographer.id == id);
}

export async function getMediaByPhotographerId(id) {
  const data = await getData();
  return data.media.filter((media) => media.photographerId == id);
}

export async function getMediaById(id) {
  const data = await getData();
  return data.media.find((media) => media.id == id);
}
