const DEFAULT_GRID = 16;
const DEFAULT_SELECTION = 'black';

let defaultSize = DEFAULT_GRID;
let defaultSelection = DEFAULT_SELECTION;

const gridContainer = document.getElementById("grid-container");
const blackBtn = document.querySelector(".black");
const rainbowBtn = document.querySelector(".rainbow");
const greyBtn = document.querySelector(".grey");
const eraserBtn = document.querySelector(".eraser");
const resetBtn = document.querySelector(".reset");
const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.querySelector('.size-value');

blackBtn.onclick = () => setCurrentSelection('black');
rainbowBtn.onclick = () => setCurrentSelection('rainbow');
greyBtn.onclick = () => setCurrentSelection('grey');
eraserBtn.onclick = () => setCurrentSelection('eraser');
resetBtn.onclick = () => resetGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => updateSize(e.target.value);

function makeGrid(size) {
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-cols', size);

    for (i = 0; i < (size * size); i++) {
        let cell = document.createElement('div');
        cell.addEventListener('mouseover', newColor);
        gridContainer.appendChild(cell).className = 'grid-item';
    };
};

function setCurrentSelection(newSelection) {
    defaultSelection = newSelection;
    activeBtn(newSelection);
}

function setNewGrid(newSize) {
    defaultSize = newSize;
    makeGrid(newSize);
}

function resetGrid() {
    clearGrid();
    makeGrid(defaultSize);
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function updateSize(value) {
    setNewGrid(value);
    updateSizeValue(value);
    resetGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function newColor(e) {
    if (defaultSelection === 'rainbow') {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    } else if (defaultSelection === 'black') {
        e.target.style.backgroundColor = '#000000';
    } else if (defaultSelection === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    } else if (defaultSelection === 'grey') {
        e.target.style.backgroundColor = '#707373';
    }
}

function activeBtn(newSelection) {
    if (defaultSelection === 'rainbow') {
        blackBtn.classList.remove('active');
        greyBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
    } else if (defaultSelection === 'black') {
        rainbowBtn.classList.remove('active'); 
        eraserBtn.classList.remove('active');
        greyBtn.classList.remove('active');
    } else if (defaultSelection === 'eraser') {
        blackBtn.classList.remove('active');
        rainbowBtn.classList.remove('active');
        greyBtn.classList.remove('active');
    } else if (defaultSelection === 'grey') {
        blackBtn.classList.remove('active');
        rainbowBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
    }

    if (newSelection === 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newSelection === 'black') {
        blackBtn.classList.add('active')
    } else if (newSelection === 'eraser') {
        eraserBtn.classList.add('active')
    } else if (newSelection === 'grey') {
        greyBtn.classList.add('active')
    }
}

window.onload = () => {
    makeGrid(defaultSize);
    activeBtn(DEFAULT_SELECTION);  
}