

/**
 * Date : nov 16 2024
 * Title : color generator tools
 * Description : this tools for rgb and hex random color generator and also color generate input valid color code.
 * author : M H R Habib.
 */

// Globals variable

let toastMessageContainer = null;
let imgURL = '';
let customColorList = new Array(12)

const defaultColor = {red : 221, green : 222, blue : 238}
const presetColorList = ['#FFB6C1', '#FFDAB9', '#FFFACD', '#E6E6FA', '#F0FFF0', '#FAFAD2', '#F5FFFA', '#F0F8FF', '#F5F5DC', '#FFE4E1', '#E0FFFF', '#D8BFD8', '#D3D3D3', '#FFFAF0', '#FFF5EE', '#FDF5E6', '#F8F8FF', '#FFF0F5', '#FAEBD7', '#FFFFE0'];
const copySound = new Audio('Audio/mixkit-fast-double-click-on-mouse-275.wav')


//Onload handler 
window.onload = () => {
    main();
    updateColorToDom(defaultColor)
    
    // Display preset colors
    const parent = document.getElementById('presetColors')
    displayColorBoxes(parent, presetColorList) // parent, color
    
    //display color from localStorage
    const customColorListFromLocalStorage = localStorage.getItem('customColor');
    if(customColorListFromLocalStorage){
        customColorList = JSON.parse(customColorListFromLocalStorage)
        displayColorBoxes(document.getElementById('customColors'), customColorList) // arguments : parent, color Array 
    }
}

// main or boot function, The function will take care of getting all the DOM references
function main(){
    
    // Dom references
    
    const generateRandomColorButton = document.getElementById('generateRandomColorButton')
    const HexColorInputOutput = document.getElementById('HexColorInputOutput')
    const colorSliderRed = document.getElementById('colorSliderRed')
    const colorSliderGreen = document.getElementById('colorSliderGreen')
    const colorSliderBlue = document.getElementById('colorSliderBlue')
    const copyToClipBoardButton = document.getElementById('copyToClipBoardButton');
    const presetColorsParent = document.getElementById('presetColors')
    const customColorsParent = document.getElementById('customColors')
    const saveCustomColorButton = document.getElementById('saveCustomColorButton');
    const bgImageUploadHelper = document.getElementById('bgImageUploadHelper')

    const ImageAddToBG = document.getElementById('ImageAddToBG')
    const bgDeleteBtn = document.getElementById('bgDeleteBtn')
    const backgroundImagePre = document.getElementById('backgroundImagePre')
    const bgMainInput = document.getElementById('bgMainInput')
    const bgController = document.getElementById('bgController');
    const container = document.getElementById('container')

  
    // event listeners
    generateRandomColorButton.addEventListener('click', handleGenerateRandomColorButton)
    HexColorInputOutput.addEventListener('keyup', handleHexColorInputOutput)
    colorSliderRed.addEventListener('change', () => {handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    colorSliderGreen.addEventListener('change',  () =>{ handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    colorSliderBlue.addEventListener('change', () => { handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    copyToClipBoardButton.addEventListener('click', () => { handlerCopyToClipBoardButton()})
    presetColorsParent.addEventListener('click', handlerPresetColorsParent)
    customColorsParent.addEventListener('click', handlerPresetColorsParent)
    saveCustomColorButton.addEventListener('click',handlerSaveCustomColorButton(customColorsParent,HexColorInputOutput))
    bgImageUploadHelper.addEventListener('click', () => bgMainInput.click())
    bgMainInput.addEventListener('change',handlerBgMainInput(backgroundImagePre, ImageAddToBG, bgController) )
    ImageAddToBG.addEventListener('click', handlerImageAddToBG(ImageAddToBG,bgDeleteBtn,container))
    bgDeleteBtn.addEventListener('click',  handlerBgDeleteBtn(backgroundImagePre,bgDeleteBtn,bgMainInput,bgController,container))

    document.getElementById('backgroundSize').addEventListener('change', changeBackgroundPreferences)
    document.getElementById('backgroundRepeat').addEventListener('change', changeBackgroundPreferences)
    document.getElementById('backgroundPosition').addEventListener('change', changeBackgroundPreferences)
    document.getElementById('backgroundAttachment').addEventListener('change', changeBackgroundPreferences)
    
    
} // main function end 


//Event handler

function handleGenerateRandomColorButton(){
    const color = generateRandomDecimalNumber() 
        updateColorToDom(color)    
}
function handleHexColorInputOutput(event){
    const HexColorCode = event.target.value; // #000000
    if(HexColorCode){
        event.target.value = HexColorCode.toUpperCase();
        if(isValidColor(HexColorCode)){
            const hexToDecimal = hexToDecimalNumber(HexColorCode); // get hexToDecimal object
            updateColorToDom(hexToDecimal)
       }
    }
   };
   function handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue){
    const color = {
        red: parseInt( colorSliderRed.value),
        green: parseInt(colorSliderGreen.value),
        blue: parseInt(colorSliderBlue.value),
    };
    updateColorToDom(color);
}

function handlerCopyToClipBoardButton(){
    const colorModeRadio = document.getElementsByName('colorMode');
    const mode = getRadioButtonValue(colorModeRadio)
    if( mode === null){
        throw new Error('Invalid Radio Input')
    }
    if( toastMessageContainer !== null){
        toastMessageContainer.remove();
        toastMessageContainer = null;
    }
    if(mode == 'hex'){
        const HexColor = document.getElementById('HexColorInputOutput').value
        if( HexColor && isValidColor(HexColor)){
            navigator.clipboard.writeText(`#${HexColor}`)
            generateToastMsg(`#${HexColor} Copied!`)
        }else{
            alert('Invalid Hex color code')
        }
    }else{
        const RGBcolor = document .getElementById('RGBColorInputOutput').value 
        if(RGBcolor){
            navigator.clipboard.writeText(`rgb${RGBcolor}`)
            generateToastMsg(`rgb${RGBcolor} Copied!`)
        }else{
            alert('Invalid RGB color code')
        }
    }
}

function handlerPresetColorsParent(event) {
    const child = event.target
    if(child.className === 'colorBox'){
        const colorCode = child.getAttribute('dataColor')
        navigator.clipboard.writeText(colorCode)
        copySound.volume = 0.5
        copySound.play();
        if( toastMessageContainer !== null){
            toastMessageContainer.remove();
            toastMessageContainer = null;
                    
        }
        generateToastMsg(colorCode)
    }
}

function handlerSaveCustomColorButton(parent, HexColorInputOutput){
    return function(){
        const hexColor = `#${HexColorInputOutput.value}`
        if(customColorList.includes(hexColor)){
            if( toastMessageContainer !== null){
                toastMessageContainer.remove();
                toastMessageContainer = null;
            }
            generateToastMsg(`${hexColor} is already your list`)
        }else{
            customColorList.unshift(hexColor)
            if(customColorList.length > 12){
                customColorList = customColorList.slice(0,12)
            }
            localStorage.setItem('customColor', JSON.stringify(customColorList))
            removeChildren(parent)
            displayColorBoxes(parent, customColorList)
        }
    }
}

// background Image Input
function handlerBgMainInput(backgroundImagePre, ImageAddToBG, bgController) {
   return function(event){
    const file = event.target.files[0]
    imgURL = URL.createObjectURL(file)
    backgroundImagePre.style.backgroundImage = `url(${imgURL})`
    backgroundImagePre.style.backgroundPosition = 'center'
    backgroundImagePre.style.backgroundSize = 'cover'  
    ImageAddToBG.style.display = 'block'
    bgController.style.display = 'block'
   }
}

function handlerBgDeleteBtn(backgroundImagePre,bgDeleteBtn,bgMainInput,bgController,container){
   return function(){
    document.body.style.backgroundImage = 'none'
    backgroundImagePre.style.backgroundImage = 'none'
    bgDeleteBtn.style.display = 'none'
    bgMainInput.value = null;
     bgController.style.display = 'none'

   }
}

// background Image Remove
function handlerImageAddToBG(ImageAddToBG,bgDeleteBtn,container){
   return function(){
    document.body.style.backgroundImage = `url(${imgURL})`
    ImageAddToBG.style.display = 'none'
    bgDeleteBtn.style.display = 'block'

   }
   
}


//DOM function

/**
 * Generate dynamic a dom element to show a toast messages
 * @param {string} msg 
 */
function generateToastMsg(msg){
    toastMessageContainer = document.createElement("div");
    toastMessageContainer.textContent = msg;
    toastMessageContainer.className = 'toastMessage toastMessage-slide-in';

    toastMessageContainer.addEventListener('click', function() {
        toastMessageContainer.classList.remove('toastMessage-slide-in');
        toastMessageContainer.classList.add('toastMessage-slide-out');
        toastMessageContainer.addEventListener('animationend', function() {
            toastMessageContainer.remove();
            toastMessageContainer = null;
        })
    })
    document.body.appendChild(toastMessageContainer);
    
}

/**
 * update Dom elements with calculated color values
 * @param {object} color 
 */
function updateColorToDom(color){ 
    const Hex = GenerateHexColor(color) //{red: 251, green: 74, blue: 10}
    const RGB = generateRGBColor(color) //{red: 251, green: 74, blue: 10}
    document.getElementById('displayColor').style.backgroundColor = Hex;
    document.getElementById('HexColorInputOutput').value = Hex.slice(1);
    document.getElementById('RGBColorInputOutput').value = RGB.slice(3);
    document.getElementById('colorSliderRed').value = color.red;
    document.getElementById('colorSliderGreen').value = color.green;
    document.getElementById('colorSliderBlue').value = color.blue;
    document.getElementById('colorSliderRedLabel').textContent = color.red;
    document.getElementById('colorSliderGreenLabel').textContent = color.green;
    document.getElementById('colorSliderBlueLabel').textContent = color.blue;
}

/**
 * find the checked element from a list of radio buttons
 * @param {array} nodes 
 * @returns {string | null}  checked radio button value
 */
function getRadioButtonValue(nodes){ // [input#selectHexMode, input#selectRGBMode]
    let checkValue = null;
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].checked){
            checkValue = nodes[i].value
            break;
        }
    }
    return checkValue;
}

/**
 * Create a div element with class name color box
 * @param {string} color 
 * @returns {object}
 */
function generateColorBox(color){
    const div = document.createElement('div')
    div.className = 'colorBox'
    div.style.backgroundColor = color
    div.setAttribute('dataColor', color)
    return div;
}

/**
 * This function will create and append color boxes to it's parent
 * @param {object} parent 
 * @param {Array} colors
 */
function displayColorBoxes(parent, colors){
    colors.forEach((color) => {
       if(color){
        const colorBox = generateColorBox(color)
        parent.appendChild(colorBox);
       }
    })
}

/**
 * Remove all children from parent
 * @param {object} parent 
 */
function removeChildren(parent){
    let child = parent.lastElementChild;
    while(child){
        parent.removeChild(child)
        child = parent.lastElementChild;
    }
}

function changeBackgroundPreferences(){

    document.body.style.backgroundSize = document.getElementById('backgroundSize').value
    document.body.style.backgroundRepeat = document.getElementById('backgroundRepeat').value
    document.body.style.backgroundPosition = document.getElementById('backgroundPosition').value
    document.body.style.backgroundAttachment = document.getElementById('backgroundAttachment').value
}


//Utils function 

/**
 *Generate random number for color code
 * @returns {object} {red,green,blue}
 */

function generateRandomDecimalNumber(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return {red,green,blue};
}

/**
 *decimal number to Hexadecimal color code Generator 
 * @param {object} {red, green, blue}
 * @returns  {string} hex color code
 */

function GenerateHexColor({red, green, blue}) {
    const getHexCode = (value) => {
        let hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;   
    }
    return `#${getHexCode(red)}${getHexCode(green)}${getHexCode(blue)}`.toUpperCase();
}


/**
 *decimal number to RGB color code Generator  
 * @param {string} red - red decimal number
 * @param {string} green - green decimal number
 * @param {string} blue - blue decimal number
 * @returns {string} RGBcolor code 
 */
function generateRGBColor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}


/**
 * convert Hex color to decimal number
 * @param {string} hex 
 * @returns {object} {red, green, blue};
 */
function hexToDecimalNumber(hex){
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4), 16);
    return {red, green, blue};
}


/**
 * validate hex color code
 * @param {string} color 
 * @returns {boolean}
 */
function isValidColor(color){
    if(color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}