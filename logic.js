let main = document.querySelector("main");
let template = document.querySelector('.product-template');
let article = document.querySelector("article");

const colors = ['#F9DBBD', '#FCA17D', '#DA627D', '#9A348E', 'lightgrey'];

let LENGHT = 0;
let animationOccurance = 0;

window.addEventListener("load", function () {

});

function getData(link) {
    fetch(link).then(response => response.json()).then(json => show(json));
}

function show(json) {
    console.log(json);
    const keys = Object.keys(json);
    let itemKeys = Object.keys(keys);
    LENGHT = keys.length;
    keys.forEach((elm, i) => {
        let temp = document.querySelector(".section-template").content;
        let clone = temp.cloneNode(true);
        let itemContent = clone.querySelector('.visible').childNodes;

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
            // clone.querySelector('.modal-tab').textContent = 
            console.log(itemKeys);

            itemKeys.forEach((item, i) => {
                clone.querySelector('.modal-tab').textContent = item;
            });

        });
        main.appendChild(clone);
    });
}





function next() {
    if (Date.now() - animationOccurance < 900)
        return;
    animationOccurance = Date.now();
    const currentSection = document.querySelector('.visible');
    const nextElementId = currentSection.id[1] * 1 === LENGHT - 1 ? 'h0' : 'h' + (currentSection.id[1] * 1 + 1);
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
    const nextElementId = currentSection.id[1] * 1 === 0 ? 'h' + (LENGHT - 1) : 'h' + (currentSection.id[1] * 1 - 1);
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
    } else if (id === "h" + (LENGHT - 1)) {
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