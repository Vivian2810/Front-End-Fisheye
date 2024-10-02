export function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price: cost } = data;

  const picture = `assets/photographers/${portrait}`;

    const article = ` 
            <article>
                <a href='photographer.html?id=${data.id}'>
                    <img src='${picture}' alt='${name}'>
                    <h2>${name}</h2>
                </a>
                <div>
                    <p class='location'>${city}, ${country}</p>
                    <p class='description'>${tagline}</p>
                    <p class='price'>${cost}€/jour</p>
                </div>
            </article>
        `;

  return { name, picture, article };
}
