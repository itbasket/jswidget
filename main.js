'use strict'

class Widget {
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.activeIndex = 0;
        this.items = [];
    }

    getImages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            return JSON.parse(xhr.responseText);
        }
    };

    toggleDescription(index) {
        document.getElementById(`segment${index}`).classList.toggle('infoBoxSlides_segment');
        document.getElementById(`slide${index}`).classList.toggle('infoBoxSlides_expand');
    };

    setIndex(index) {
        if (document.getElementsByClassName('infoBoxSlides_active')[0] !== undefined) {
            document.getElementsByClassName('infoBoxSlides_active')[0].classList.remove('infoBoxSlides_active');
        }
        document.getElementsByClassName('infoBoxSlides_slide')[index].classList.add('infoBoxSlides_active');
        this.activeIndex = index;
    };

    increaseIndex() {
        const newIndex = this.activeIndex < this.items.length - 1 ? this.activeIndex + 1 : 0
        this.setIndex(newIndex)
    };

    decreaseIndex() {
        const newIndex = this.activeIndex >= 1 ? this.activeIndex - 1 : this.items.length - 1
        this.setIndex(newIndex)
    };

    toFirst() {
        this.setIndex(0)
    };

    toLast() {
        this.setIndex(this.items.length - 1)
    };

    create() {
        this.items = this.getImages();
        root.insertAdjacentHTML('afterbegin', 
            `<div style='display: flex; justify-content: center'>
                <div class='infoBox'>
                    <div id='slides' class='infoBoxSlides'></div>
                    <div class='infoBoxFooter'>
                        <button class='infoBox_control' onclick='${this.name}.toFirst()'><<<</button>
                        <button class='infoBox_control' onclick='${this.name}.decreaseIndex()'><</button>
                        <button class='infoBox_control' onclick='${this.name}.increaseIndex()'>></button>
                        <button class='infoBox_control' onclick='${this.name}.toLast()'>>>></button>
                    </div>
                </div>
            </div>`);
        this.items.forEach((element, index) => {
            slides.insertAdjacentHTML('beforeend', 
                `<div id='slide${index}' class='infoBoxSlides_slide' style='transform: translateX(${-index * 100}%);'>
                    <div class='infoBoxSlides_thumbnail'>
                        <img src='${element.img}' alt='${element.title}'>
                    </div>
                    <div class='infoBoxSlides_content'>
                        <div class='infoBoxSlides_title'>${element.title}</div>
                        <p>
                            ${element.description.slice(0, 50)}<span id='segment${index}' class='infoBoxSlides_segment'>${element.description.slice(50)}</span>
                        </p>
                    </div>
                    <div class='infoBoxSlides_footer'>
                        <button class='infoBoxSlides_btn' onclick='${this.name}.toggleDescription(${index})'>Toggle</button>
                    </div>
                </div>`);
        });
        this.toFirst();
    };
};
   
const app = new Widget('app', 'https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/ads');
app.create();