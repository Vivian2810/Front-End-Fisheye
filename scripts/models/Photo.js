export class Photo {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
}