/*Dato un array di oggetti letterali con: - url dell’immagine - titolo - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: 
costruiamo il container e inseriamo l’immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello. 
Al click dell’utente sulle frecce verso sinistra o destra, l’immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. 
Ovvero se la miniatura attiva è la prima e l’utente clicca la freccia verso destra, 
la miniatura che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//dichiarare una variabile che sarà associata all'autoplay dello slideshow
let slideshowInterval;

//Selezionare il contenitore dove saranno presenti le immagini
const container = document.getElementById("col-image");

//Selezionare i bottoni per far in modo che le immagini avanzino e retrocedano
const nextButton = document.querySelector("#arrow-down");
const prevButton = document.querySelector("#arrow-up");

//selezionare i pulsanti per attivare e disattivare l'autoplay
const startAutoplay = document.getElementById("btn-play");
const stopAutoplay = document.getElementById("btn-stop");

//Creare array con le informazioni necessarie
const images = [
    {
        "image": 'img/01.webp',
        "title": 'Marvel\'s Spiderman Miles Morale',
        "text": 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        "image": 'img/02.webp',
        "title": 'Ratchet & Clank: Rift Apart',
        "text": 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        "image": 'img/03.webp',
        "title": 'Fortnite',
        "text": "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    },
    {
        "image": 'img/04.webp',
        "title": 'Stray',
        "text": 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        "image": 'img/05.webp',
        "title": "Marvel's Avengers",
        "text": 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

//Estrarre gli oggetti dell'array e creare gli elementi di markup per ogni oggetto
images.forEach((element) => {

    let itemImage = `
        <div class="image">
            <div class="text">
                <h4>${element.title}</h4>
                <span>${element.text}</span>
            </div>
            <img src="${element.image}" alt="${element.title}">
        </div>
    `;

    //Inserisci gli elementi nella pagina
    container.innerHTML += itemImage;
});

//Selezionare tutti gli elementi di markup con classe "image"
const items = document.getElementsByClassName("image");

//Inizializzare il primo elemento come attivo
let activeItems = 0;
items[activeItems].classList.add("active");

// Creare un evento che permetta di avanzare le immagini al click della freccia in alto
nextButton.addEventListener('click', function () {
    let newIndex = (activeItems + 1) % items.length;
    update(newIndex);
});

//Creare un evento che permetta di retrocedere le immagini al click della freccia in basso
prevButton.addEventListener('click', function () {
    let newIndex = (activeItems - 1 + items.length) % items.length;
    update(newIndex);
});

//Selezionare il contenitore delle anteprime
const thumbs = document.getElementById("thumbs");

//Estrarre le anteprime e creare gli elementi di markup per ogni oggetto
images.forEach((element) => {

    let thumbsImage = `
        <div class="image-thumbs">
            <img src="${element.image}" alt="${element.title}">
        </div>
    `;

    //Inserisci gli elementi in pagina
    thumbs.innerHTML += thumbsImage;
});

//Selezionare tutti gli elementi di markup con classe "image-thumbs"
const boxThumbs = document.getElementsByClassName("image-thumbs");

//Inizializzare la prima miniatura come selezionata
boxThumbs[activeItems].classList.add("selected");

//Aggiungere evento di click su ciascuna anteprima
Array.from(boxThumbs).forEach((thumb, index) => {

    thumb.addEventListener('click', function () {
        update(index);
    });
});

//creare un evento che permetta all'utente di attivare e disattivare lo slideshow automatico
startAutoplay.addEventListener('click',

    function(){
        startSlideshow();
    }
);

stopAutoplay.addEventListener('click',

    function () {
        stopSlideshow();
    }
);

//Iniziare lo slideshow automatico
startSlideshow();

//FUNZIONI//

//Funzione per aggiornare l'immagine attiva e la miniatura selezionat
function update(newIndex) {

    //Rimuovere la classe active e selected dagli elementi correnti
    items[activeItems].classList.remove("active");
    boxThumbs[activeItems].classList.remove("selected");

    //Aggiornare l'indice dell'elemento attivo
    activeItems = newIndex;

    //Aggiungere la classe active e selected ai nuovi elementi
    items[activeItems].classList.add("active");
    boxThumbs[activeItems].classList.add("selected");
};

//Funzione per lo slideshow automatico
function startSlideshow() {
    slideshowInterval = setInterval(function () {
        let newIndex = (activeItems + 1) % items.length;
        update(newIndex);
    }, 3000); // Cambia immagine ogni 3 secondi
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}




