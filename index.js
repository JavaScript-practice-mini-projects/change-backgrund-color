
/**
 * Date : nov 16 2024
 * Title : color generator tools
 * Description : this tools for rgb and hex random color generator and also color generate input valid color code.
 * author : M H R Habib.
 */

// Globals variable
const colorCodeShowHex = document.getElementById('colorCodeShowHex');
const inputButton = document.getElementById('inputbtn');
const colorContainer = document.getElementById('colorContainer');
const colorCodeShowRGB = document.getElementById('colorCodeShowRGB');
const copyButtonRGB = document.getElementById('copyButtonRGB');

let copiedContainer = null;

//Onload handler 
window.onload = () => {
    main();
}

// main or boot function, The function will take care of getting all the DOM references
function main(){

    const generateRandomColorButton = document.getElementById('generateRandomColorButton')

    generateRandomColorButton.addEventListener('click', function() {
        handleGenerateRandomColorButton()
    });

    const HexColorInputOutput = document.getElementById('HexColorInputOutput')

    HexColorInputOutput.addEventListener('keyup', function(event){
    const HexColorCode = event.target.value; // #000000
    if(HexColorCode){
        HexColorInputOutput.value = HexColorCode.toUpperCase()

        if(isValidColor(HexColorCode)){
            const hexToDecimal = hexToDecimalNumber(HexColorCode);
            updateColorToDom(hexToDecimal)

     }
    }
   });


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



} // main function end 


//Even handler

function handleGenerateRandomColorButton(){
    const color = generateRandomDecimalNumber() 
        updateColorToDom(color)
        
}

//DOM function

// generateToastMsg
function generateToastMsg(msg){
    copiedContainer = document.createElement("div");
    copiedContainer.textContent = msg;
    copiedContainer.className = 'toastMessage toastMessage-slide-in';

    copiedContainer.addEventListener('click', function() {
        copiedContainer.classList.remove('toastMessage-slide-in');
        copiedContainer.classList.add('toastMessage-slide-out');
        copiedContainer.addEventListener('animationend', function() {
            copiedContainer.remove();
            copiedContainer = null;
        })
    })
    document.body.appendChild(copiedContainer);
}

/**
 * update Dom elements with calculated color values
 * @param {object} color 
 */
function updateColorToDom(color){ 
    const Hex = GenerateHexColor(color) //{red: 251, green: 74, blue: 10}
    const RGB = generateRGBColor(color) //{red: 251, green: 74, blue: 10}
 document.getElementById('displayColor').style.backgroundColor = Hex;
 document.getElementById('HexColorInputOutput').value = Hex;
 document.getElementById('RGBColorInputOutput').value = RGB;
 document.getElementById('colorSliderRed').value = color.red;
 document.getElementById('colorSliderGreen').value = color.green;
 document.getElementById('colorSliderBlue').value = color.blue;
 document.getElementById('colorSliderRedLabel').textContent = color.red;
 document.getElementById('colorSliderGreenLabel').textContent = color.green;
 document.getElementById('colorSliderBlueLabel').textContent = color.blue;
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
 * @param {string} red - red decimal number
 * @param {string} green - green decimal number
 * @param {string} blue - blue decimal number
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
