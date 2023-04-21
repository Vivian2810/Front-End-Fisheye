function photographerFactory(data) {
    const { name, portrait, city, country, tagline, cost} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const location = document.createElement( 'p' );
        const description = document.createElement( 'p' );
        const price = document.createElement( 'p' );
        const div = document.createElement( 'div' );
        h2.textContent = name;
        location.textContent = city + ', ' + country;
        location.classList.add('location');
        description.textContent = tagline;
        description.classList.add('description');
        price.textContent = cost + '€/jour';
        price.classList.add('price');
        div.appendChild(location);
        div.appendChild(description);
        div.appendChild(price);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}