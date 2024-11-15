


// Globals variable
const colorCodeShowHex = document.getElementById('colorCodeShowHex');
const inputButton = document.getElementById('inputbtn');
const colorContainer = document.getElementById('colorContainer');
const colorCodeShowRGB = document.getElementById('colorCodeShowRGB');
const copyButtonRGB = document.getElementById('copyButtonRGB');

let copiedContainer = null;


//window loaded : first visit then load this and call main function
window.onload = () => {
    main();
}

// main function : always reloaded this function
function main(){
    const changeButton = document.getElementById('changeButton');
    const copyButtonHex = document.getElementById('copyButtonHex');


   // Color Change Button function call
   changeButton.addEventListener('click', function () {
       const colorObject = generateRandomDecimalNumber();
       const HexColor = GenerateHexColor(colorObject);
       const RGBColor = generateRGBColor(colorObject);

        colorCodeShowHex.value = HexColor.substring(1).toUpperCase();
        colorContainer.style.backgroundColor = HexColor;
        colorCodeShowRGB.value = RGBColor;
   })


   // color code copy button 
   copyButtonHex.addEventListener('click', function(){
    colorCodeShowHex.select();
    navigator.clipboard.writeText(`#${colorCodeShowHex.value}`);
    if( copiedContainer !== null){
        copiedContainer.remove();
        copiedContainer = null;
        
    }
   if(isValidColor(colorCodeShowHex.value)){
       generateToastMsg(`#${colorCodeShowHex.value} Copied!`);
   }else{
    alert('Your color is Invalid')
   }
   
   })
   copyButtonRGB.addEventListener('click', function(){
    colorCodeShowRGB.select();
    navigator.clipboard.writeText(`#${colorCodeShowRGB.value}`);
    if( copiedContainer !== null){
        copiedContainer.remove();
        copiedContainer = null;
        
    }
   if(isValidColor(colorCodeShowHex.value)){
       generateToastMsg(`${colorCodeShowRGB.value} Copied!`);
   }else{
    alert('Your color is Invalid')
   }
   
   })


   //Hex input color code change hex and rgb input & change backgroundColor
   colorCodeShowHex.addEventListener('keyup', function(e){
    const color = e.target.value;
    if(color){
        colorCodeShowHex.value = color.toUpperCase()
        if(color && isValidColor(color)){
            colorContainer.style.backgroundColor = `#${color}`;
            colorCodeShowRGB.value = hexToRgb(color);
     }
    }
   })


   //click Enter key change color
   changeButton.addEventListener('click', () => {
    document.addEventListener('keydown', clickEnter)
   })
  function clickEnter(even){
    if( even.key === 'Enter'){
        document.removeEventListener('keydown', clickEnter);
    }
  }



} // main function end 



//Generate random number for color code
function generateRandomDecimalNumber(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return{
        red,
        green,
        blue,
    };
}


//Generate Hexadecimal color code
function GenerateHexColor({red, green, blue}) {

    const getHexCode = (value) => {
        let hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
        
    }
    return `#${getHexCode(red)}${getHexCode(green)}${getHexCode(blue)}`.toUpperCase();



/*
    //another way
    const redCode = red.toString(16).padStart(2, '0');
    const greenCode = green.toString(16).padStart(2, '0');
    const blueCode = blue.toString(16).padStart(2, '0');
    return  `#${redCode}${greenCode}${blueCode}`.toUpperCase();
    */
}

//Generate RGB color code
function generateRGBColor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}


/**
 * Convert hex color to RGB  color
 * @param {string} hex 
 */
function hexToRgb(hex){
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
}


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

    //type error : can't read properties of null (reading "remove") 
    /*if( copiedContainer !== null){
        setTimeout(() => {
            copiedContainer.remove();
            copiedContainer = null;
        }, 3000);
    } */
}

/* 
* @param {string} color : ;
*/

function isValidColor(color){
    //#ff00ee
    if(color.length !== 6) return false;
  
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}
