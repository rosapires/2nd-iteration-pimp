let main = document.querySelector("main");
let article = document.querySelector("article");
const colors = ['#F9DBBD', '#FCA17D', '#DA627D', '#9A348E', 'lightgrey'];


let LENGHT = 0;
let animationOccurance = 0;

// new FetchGoogleJSON("1_EHOt_PDayCeNhF_nRSLVdsNSXhv2Gbp90Dr0vhvZ_U", show);

function generateContent(json) {
  console.log(json);
  const sections = Object.keys(json);
  LENGHT = sections.length;
  
  sections.forEach((section, i) => {
    let template = document.querySelector(".section-template").content;
    let clone = template.cloneNode(true);
    
    const sectionData = json[section];
    clone.querySelector('.section-name span').textContent = sectionData.title;
    clone.querySelector('.mainIcons').src = sectionData.image;
    
    generateSubcategory(clone, sectionData);

    const sectionElement = clone.querySelector('.box');
    sectionElement.style.backgroundColor = colors[i];
    sectionElement.setAttribute('id', 'h' + i)
    sectionElement.addEventListener('click', () => show(i));
    main.appendChild(clone);
  });
  listenforClose()
}

function generateSubcategory(clone, data) {
  // console.log(data);
    const subsections = Object.keys(data.subcategory);
  subsections.forEach((subsection, i) => {
    const template = clone.querySelector(".subsection-template").content;
    const subClone = template.cloneNode(true);
    const subsectionData = data.subcategory[subsection];
    const subElements = Object.keys(subsectionData);
    let lastOverlay;
    let modalContent = "";
    
    subElements.forEach(element => {
      if (element === 'title') {
        modalContent += `<h3>${subsectionData[element]}</h3>`;

      } else if (typeof subsectionData[element] === "object" && subsectionData[element].length) {
        let list = '<ul>' + element;
        subsectionData[element].forEach(el => {
          list += `<li>${el}</li>`;
        });
        list += "</ul>"
        modalContent += list;
      } else {
        modalContent += `<p>${subsectionData[element]}</p>`;
      }
    });

    const container = subClone.querySelector('div');

    container.innerHTML = `<h3>${subsectionData.title}</h3>`;


    container.addEventListener('click', function (e) {
      showModal(modalContent);
    })

    // generateList(subClone, subsectionData);

    clone.querySelector(".section-content").appendChild(subClone);

  });
}

function showModal(content) {
  const modal = document.querySelector('.modalNew ');
  modal.innerHTML = content;
  document.querySelector('.modal-wrapper').classList.add('show');
}

function closeModal() {
  document.querySelector('.modal-wrapper').classList.remove('show');

}

function show(i) {
  console.log("show called")
  const mainSection = document.querySelector('#h' + i);
  document.querySelectorAll('.visible').forEach(element => {
    element.classList.remove('visible');
    element.classList.remove('expanded');
  });
  mainSection.classList.add('visible');
  mainSection.classList.add('expanded');
  document.querySelector('.mainIcons').classList.add("hidden");
  handleArrows('h' + i);
}

function next() {
  if (Date.now() - animationOccurance < 900)
    return;
  animationOccurance = Date.now();
  const currentSection = document.querySelector('.visible');
  const nextElementId = currentSection.id[1] * 1 === LENGHT - 1 ? 'h0' : 'h' + (currentSection.id[1] * 1 + 1);
  const nextElement = document.querySelector('#' + nextElementId);
  currentSection.classList.remove('visible');
  currentSection.classList.remove('expanded');
  nextElement.classList.add('visible');
  nextElement.classList.add('expanded');
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
  currentSection.classList.remove('expanded');
  nextElement.classList.add('visible');
  nextElement.classList.add('expanded');
  handleArrows(nextElementId);
}




function listenforClose() {
  let closeImgs = document.querySelectorAll('.close');
  
  closeImgs.forEach((ci)=> {
    ci.addEventListener('click', close)
    console.log(ci);
  });
}

function close(e) {
  console.log("close called")
  e.stopPropagation();
  document.querySelector('.mainIcons').classList.remove("hidden");
  document.querySelectorAll('.box').forEach(element => {
    
    element.classList.add('visible');
    element.classList.remove('expanded');
    console.log(element.classList)
  });
 // handleArrows();
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

fetch('pimp.json').then(response => response.json()).then(generateContent);
// new FetchGoogleJSON("1_EHOt_PDayCeNhF_nRSLVdsNSXhv2Gbp90Dr0vhvZ_U", generateContent);


document.addEventListener('keyup', (e) => {
  switch (e.keyCode) {
    case 39:
      next();
      break;

    case 37:
      prev();
      break;

    case 27:
      close();
      break;

    default:
      break;
  }
});