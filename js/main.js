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
la miniatura che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sinistra.*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//selezionare il contenitore dove saranno presenti le immagini
const container = document.getElementById("col-image");

//creare array con le informazioni necessarie

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

//estrarre gli oggetti dell'array
images.forEach((element) =>{

    // Creare gli elementi di markup per ogni oggetto
    let itemImage = `
        <div class="image">
            <div class="text">
                <h4>${element.title}</h4>
                <span>${element.text}</span>
            </div>
            <img src="${element.image}" alt="${element.title}">
        </div>
    `;

    // Inserire gli elementi nella pagina
    container.innerHTML += itemImage;

}
)

//inserire tutti gli elementi di markup in base alla classe ".item"

const items = document.getElementsByClassName("image");

//provare a inserire la classe ".active" per ogni singolo elemento
let activeItems = 0;
items[activeItems].classList.add("active");

//selezionare l'id del bottone che fa scorrere lo slider in alto
const nextButton = document.querySelector("#arrow-down");

//selezionare l'id del bottone che fa scorrere lo slider in basso
const prevButton = document.querySelector("#arrow-up");

//creare un evento che permetta di avanzare le immagini al click
nextButton.addEventListener('click',
    function () {

        // Rimuovere la classe active dell'immagine precedente 
        items[activeItems].classList.remove("active");

        // Incrementare il valore degli items e gestire i limiti
        activeItems = (activeItems + 1) % items.length;

        // Associare la classe active agli items
        items[activeItems].classList.add("active");

    }
);

//creare un evento che permetta di ritornare alle immagini cliccando sul pulsante in basso
prevButton.addEventListener('click',
    function () {

        // Rimuovere la classe active dell'immagine precedente
        items[activeItems].classList.remove("active");

        // decrementare il valore degli items
        activeItems = (activeItems - 1 + items.length) % items.length;

        // Associare la classe active agli items
        items[activeItems].classList.add("active");
    }
);

// Selezionare gli elementi di markup che rappresentano le anteprime delle immagini
const thumbs = document.getElementById("thumbs");

//estrapolare le anteprime
images.forEach((element) => {

    // Creare gli elementi di markup per ogni oggetto
    let thumbsImage = `
        <div class="image-thumbs">
            <img src="${element.image}" alt="${element.title}">
        </div>
    `;

    // Inserire gli elementi nella pagina
    thumbs.innerHTML += thumbsImage;

}
);

//inserire tutti gli elementi di markup in base alla classe ".item"

const boxThumbs = document.getElementsByClassName("image-thumbs");

// Aggiungere evento di click su ciascuna anteprima
Array.from(boxThumbs).forEach((thumb, index) => {
    
    thumb.addEventListener('click', 
        
        function () {

        // Rimuovere la classe active dell'immagine precedente
        items[activeItems].classList.remove("active");

        // Impostare l'elemento attivo all'indice cliccato
        activeItems = index;

        // Associare la classe active agli items
        items[activeItems].classList.add("active");
    });
});



