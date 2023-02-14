function openOptionsColor() {
    const toolOptions = document.querySelector('.tools-options');
    const redSelector = document.createElement('div');
    const greenSelector = document.createElement('div');
    const orangeSelector = document.createElement('div');
    const violetSelector = document.createElement('div'); 
    const cyanSelector = document.createElement('div');

    redSelector.style.backgroundColor = 'red';
    greenSelector.style.backgroundColor = 'rgb(28, 196, 24)';
    orangeSelector.style.backgroundColor = 'orange';
    violetSelector.style.backgroundColor = 'rgb(151, 24, 219)';
    cyanSelector.style.backgroundColor = 'rgb(24, 186, 219 )';

    redSelector.setAttribute('id', 'red');
    greenSelector.setAttribute('id', 'green');
    orangeSelector.setAttribute('id', 'orange');
    violetSelector.setAttribute('id', 'violet');
    cyanSelector.setAttribute('id', 'cyan');

    const defaultColors = [redSelector, greenSelector, orangeSelector, violetSelector, cyanSelector];
    toolOptions.style.backgroundColor = 'rgb(0, 23, 65)';
    defaultColors.forEach((color) => {
        color.style.border = '3px solid rgb(0, 32, 92)';
        color.style.borderRadius = '6px';
        color.style.width = '30px';
        color.style.height = '30px';
        toolOptions.appendChild(color);
        color.addEventListener('click', () => {
            const colorIcon = document.querySelector('.color-picker');

            // change the color of the color button in the toolbar
            switch (color.getAttribute('id')) {
                case 'red':
                    colorIcon.style.backgroundColor = 'red';
                    break
                case 'green':
                    colorIcon.style.backgroundColor = 'rgb(28, 196, 24)';
                    break
                case 'orange':
                    colorIcon.style.backgroundColor = 'orange';
                    break
                case 'violet':
                    colorIcon.style.backgroundColor = 'rgb(151, 24, 219)';
                    break
                case 'cyan':
                    colorIcon.style.backgroundColor = 'rgb(24, 186, 219 )';
                    break
            }
        });
    });
}


function closeOptionsColor() {
    const toolOptions = document.querySelector('.tools-options');
    const redSelector = document.querySelector('div#red');
    const greenSelector = document.querySelector('div#green');
    const orangeSelector = document.querySelector('div#orange');
    const violetSelector = document.querySelector('div#violet'); 
    const cyanSelector = document.querySelector('div#cyan');

    redSelector.style.backgroundColor = '';
    greenSelector.style.backgroundColor = '';
    orangeSelector.style.backgroundColor = '';
    violetSelector.style.backgroundColor = '';
    cyanSelector.style.backgroundColor = '';

    // haha line 69 funny number (im gonna die alone)
    const defaultColors = [redSelector, greenSelector, orangeSelector, violetSelector, cyanSelector];
    toolOptions.style.backgroundColor = 'rgb(0, 0, 26)';
    defaultColors.forEach((color) => {
        color.style.border = '';
        color.style.borderRadius = '';
        color.style.width = '';
        color.style.height = '';
        toolOptions.removeChild(color);
    });
}


const input = document.querySelector('.form-number');
input.addEventListener('click', (e) => {
    e.target.select();
})

let newSize;
const generateButton = document.querySelector('.form-button');
generateButton.addEventListener('click', () => {
    const inputField = document.querySelector('.form-number');
    newSize = inputField.value;
    generateCanvas(newSize);
});

// entering a value and pressing enter works
window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        const inputField = document.querySelector('.form-number');
        e.target.blur();
        newSize = inputField.value;
        generateCanvas(newSize);
    }
})

// change the mode
let currentMode = 'draw';
function changeMode(mode) {
    currentMode = mode;
}
//options
const drawOption = document.querySelector('.draw');
const eraseOption = document.querySelector('.eraser');
drawOption.addEventListener('click', () => {
    changeMode('draw');
    drawOption.style.border = '3px solid orange';
    eraseOption.style.border = '';
});

eraseOption.addEventListener('click', () => {
    changeMode('eraser');
    drawOption.style.border = '';
    eraseOption.style.border = '3px solid orange';

});
// additional function for checking the mode and deciding the styles
function checkMode (mode) {
    if (mode == 'draw') {
        drawOption.style.border = '3px solid orange';
        eraseOption.style.border = '';
    } else if (mode == 'eraser') {
        drawOption.style.border = '';
        eraseOption.style.border = '3px solid orange';
    }
}

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;
function draw(e) {
    // if the mouse is over the square but isn't pressin - don't draw anything
    if (e.type === 'mouseover' && !mouseDown) {return}
    else if (currentMode == 'draw') {
        const color = document.querySelector('.color-picker');
        e.target.style.backgroundColor = getComputedStyle(color).backgroundColor // new function i haven't heard of before 👍👍
    } else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = '';
    }
}

function generateCanvas(size) {
    checkMode(currentMode);
    size = parseInt(size);
    const error = document.querySelector('#size-error');
    error.textContent = '';
    if (size > 50) {
        error.textContent = 'Only supports sizes up to 50x50 px!';
    } else if (isNaN(size) === true) {
        error.textContent = 'Enter a valid size number!';
    } else {
        // clear the previous canvas
        const previousDivs = document.querySelectorAll('.canvas-div');
        previousDivs.forEach((div) => {
            const canvas = document.querySelector('.canvas');
            canvas.removeChild(div);
        });

        // generate new canvas
        for (let i = 1; i<=size*size; i++) {
            const div = document.createElement('div');
            div.classList.add('canvas-div');
            const canvas = document.querySelector('.canvas');
            const sizeOfOneDiv = (canvas.offsetWidth - 9) / size; // i have to subtract the additional margin, border and padding off the element with this method
            div.style.width = `${sizeOfOneDiv}px`;
            div.style.height = `${sizeOfOneDiv}px`;
            div.style.boxSizing = 'border-box';
            div.style.userSelect = 'none';
            div.style.flexGrow = '1';
            div.setAttribute('draggable', false);
            div.addEventListener('mouseover', (e) => {draw(e)});
            div.addEventListener('mousedown', (e) => {draw(e)}); // to be able to one-dot draw
            canvas.appendChild(div);
        }
    }
}

// default canvas
const inputField = document.querySelector('.form-number');
inputField.value = 10;
generateCanvas(10);

function clearCanvas() {
    const canvasDivs = document.querySelectorAll('.canvas-div');
    canvasDivs.forEach((div) => {
        div.style.backgroundColor = '';
    })
}

const clearCanvasButton = document.querySelector('#clear-canvas');
clearCanvasButton.addEventListener('click', () => {
    clearCanvas();
    // idk i just thought this would look nice for anyone watching the console while playing around in the canvas
    console.log('%c canvas cleared!', 'font-size: 20px; color: orange;');
    setTimeout(() => {console.clear()}, 1000);
});

const colorPicker = document.querySelector('.color-picker');
colorPicker.addEventListener('click',() => {openOptionsColor()});
const canvas = document.querySelector('.canvas');
canvas.addEventListener('mousedown', () => {closeOptionsColor()});