document.addEventListener('DOMContentLoaded', function () {
    imgLoad(); loadBreedOpt()
  });

let dogBreeds = [];

// FETCH IMAGES //
function imgLoad() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
    .then(response => response.json())
    .then(results => { results.message.forEach(image => loadImg(image))});
}

// ADD IMGAGE TO CONTAINER
function loadImg(dogImageUrl) {
    let container = document.querySelector('#dog-image-container');
    let imgElement = document.createElement('img');
    imgElement.src = dogImageUrl;
    container.appendChild(imgElement);
}

// LOAD THE BREEDING OPTIONS
function loadBreedOpt() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(response => response.json())
    .then(results => { dogBreeds = Object.keys(results.message);
        updateBreedList(dogBreeds);
        addBreedSelectListerner();
    });
}

// UPDATE THE BREED LIST
function updateBreedList(dogBreeds) {
    let ul = document.querySelector('#dog-breeds');
    deleteChild(ul);
    dogBreeds.forEach(breed => addBreed(breed));
}

function deleteChild(element) {
let child = element.lastElementChild;
    while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
    }
}

// SELECT BREED FROM A PARTICULAR LETTER
function selectFromBreed(letter) { updateBreedList(dogBreeds.filter(breed => breed.startsWith(letter)))}

// LISTEN FOR USER SELECTION
function addBreedSelectListerner() {
let dropDownSelec = document.querySelector('#breed-dropdown');
    dropDownSelec.addEventListener('change', function (event) {
        selectFromBreed(event.target.value);
    });
}

// ADD BREEDS
function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) { event.target.style.color = 'purple'; }


