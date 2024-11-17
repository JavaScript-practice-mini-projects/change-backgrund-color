
/**
 * Date : nov 16 2024
 * Title : color generator tools
 * Description : this tools for rgb and hex random color generator and also color generate input valid color code.
 * author : M H R Habib.
 */

// Globals variable

let toastMessageContainer = null;

//Onload handler 
window.onload = () => {
    main();
}

// main or boot function, The function will take care of getting all the DOM references
function main(){

    // Dom references

    const generateRandomColorButton = document.getElementById('generateRandomColorButton')
    const HexColorInputOutput = document.getElementById('HexColorInputOutput')
    const colorSliderRed = document.getElementById('colorSliderRed')
    const colorSliderGreen = document.getElementById('colorSliderGreen')
    const colorSliderBlue = document.getElementById('colorSliderBlue')
    const colorModeRadio = document.getElementsByName('colorMode');
    const copyToClipBoardButton = document.getElementById('copyToClipBoardButton');
    
    copyToClipBoardButton.addEventListener('click', function(){
        const mode = getRadioButtonValue(colorModeRadio)
        if( mode === null){
            throw new Error('Invalid Radio Input')
        }
        if(mode == 'hex'){
            const HexColor = document.getElementById('HexColorInputOutput').value
            navigator.clipboard.writeText(`#${HexColor}`)
            
        }else{
            const RGBcolor = document .getElementById('RGBColorInputOutput').value 
            navigator.clipboard.writeText(`rgb${RGBcolor}`)
        }
    })
    
    
    
    

    
    // event listeners
    generateRandomColorButton.addEventListener('click', handleGenerateRandomColorButton)
    HexColorInputOutput.addEventListener('keyup', handleHexColorInputOutput)
    colorSliderRed.addEventListener('change', () => {handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    colorSliderGreen.addEventListener('change',  () =>{ handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    colorSliderBlue.addEventListener('change', () => { handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)})
    
    
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



//    copyButtonHex.addEventListener('click', function(){
//     colorCodeShowHex.select();
//     navigator.clipboard.writeText(`#${colorCodeShowHex.value}`);
//     if( copiedContainer !== null){
//         copiedContainer.remove();
//         copiedContainer = null;
        
//     }
//    if(isValidColor(colorCodeShowHex.value)){
//        generateToastMsg(`#${colorCodeShowHex.value} Copied!`);
//    }else{
//     alert('Your color is Invalid')
//    }
   
//    })
//    copyButtonRGB.addEventListener('click', function(){
//     colorCodeShowRGB.select();
//     navigator.clipboard.writeText(`#${colorCodeShowRGB.value}`);
//     if( copiedContainer !== null){
//         copiedContainer.remove();
//         copiedContainer = null;
        
//     }
//    if(isValidColor(colorCodeShowHex.value)){
//        generateToastMsg(`${colorCodeShowRGB.value} Copied!`);
//    }else{
//     alert('Your color is Invalid')
//    }
   
//    })





//    //click Enter key change color
//    changeButton.addEventListener('click', () => {
//     document.addEventListener('keydown', clickEnter)
//    })
//   function clickEnter(even){
//     if( even.key === 'Enter'){
//         document.removeEventListener('keydown', clickEnter);
//     }
//   }
