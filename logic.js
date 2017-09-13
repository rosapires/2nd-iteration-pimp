let main = document.querySelector("main");
let template = document.querySelector('.product-template');
let article = document.querySelector("article");

const colors = ['pink', 'tomato', 'deepskyblue', 'yellow', 'lightgrey'];

let LEGHT = 0;
let animationOccurance = 0;

window.addEventListener("load", function () {

});

function getData(link) {
    fetch(link).then(response => response.json()).then(json => show(json));
}

function show(json) {
    console.log(json);
    const keys = Object.keys(json);
    LEGHT = keys.length;
    keys.forEach((elm, i) => {
        /*let newelm = document.createElement('li');
        newelm.textContent=elm.title;
        ul.appendChild(newelm);*/
        let temp = document.querySelector(".section-template").content;
        let clone = temp.cloneNode(true);
        clone.querySelector('.section-name').textContent = elm;
        const section = clone.querySelector('.box');
        section.style.backgroundColor = colors[i];
        section.setAttribute('id', 'h' + i)
        section.addEventListener('click', (e) => {
            const mainSection = document.querySelector('#h' + i);
            document.querySelectorAll('.visible').forEach(element => {
                element.classList.remove('visible');
            });
            mainSection.classList.add('visible');
            handleArrows('h' + i);
        });

        // clone.querySelector('.year').textContent=elm.year;
        // clone.querySelector('.director').textContent=elm.director;
        // clone.querySelector('.genres').textContent=elm.genres;
        // clone.querySelector('.plotSummary').textContent=elm.plotSummary;
        main.appendChild(clone);

    });
}

function next() {
    if (Date.now() - animationOccurance < 900)
        return;
    animationOccurance = Date.now();
    const currentSection = document.querySelector('.visible');
    const nextElementId = currentSection.id[1] * 1 === LEGHT - 1 ? 'h0' : 'h' + (currentSection.id[1] * 1 + 1);
    const nextElement = document.querySelector('#' + nextElementId);
    currentSection.classList.remove('visible');
    nextElement.classList.add('visible');
    handleArrows(nextElementId);
}

function prev() {
    if (Date.now() - animationOccurance < 900)
        return;
    animationOccurance = Date.now();
    const currentSection = document.querySelector('.visible');
    const nextElementId = currentSection.id[1] * 1 === 0 ? 'h' + (LEGHT - 1) : 'h' + (currentSection.id[1] * 1 - 1);
    const nextElement = document.querySelector('#' + nextElementId);
    currentSection.classList.remove('visible');
    nextElement.classList.add('visible');
    handleArrows(nextElementId);
}

function close() {
    document.querySelectorAll('.box').forEach(element => {
        element.classList.add('visible');
    });
    handleArrows();
}

function handleArrows(id) {
    if (id === 'h0') {
        document.querySelector('.arrow_left').style.display = 'none';
        document.querySelector('.arrow_right').style.display = 'flex';
    } else if (id === "h" + (LEGHT - 1)) {
        document.querySelector('.arrow_left').style.display = 'flex';
        document.querySelector('.arrow_right').style.display = 'none';
    } else if (id) {
        document.querySelector('.arrow_left').style.display = 'flex';
        document.querySelector('.arrow_right').style.display = 'flex';
    } else {
        document.querySelector('.arrow_left').style.display = 'none';
        document.querySelector('.arrow_right').style.display = 'none';
    }
}

getData('pimp.json');