


// globals
const colorCodeShow = document.getElementById('colorCodeShow');
const inputButton = document.getElementById('inputbtn');
const colorContainer = document.getElementById('colorContainer');

let copiedContainer = null;


// step 1 onload handler
window.onload = () => {
    main();
}
function main(){
    const changeButton = document.getElementById('changeButton');
    const copyButton = document.getElementById('copyButton');

   //changeButton function call
   changeButton.addEventListener('click', function () {
       const HexColor = GenerateHexColor();
        colorContainer.style.backgroundColor = HexColor;
        colorCodeShow.value = HexColor;
   })

   // color code copy button 
   copyButton.addEventListener('click', function(){
    colorCodeShow.select();
    navigator.clipboard.writeText(colorCodeShow.value);
    if( copiedContainer !== null){
        copiedContainer.remove();
        copiedContainer = null;
        
    }
   if(isValidColor(colorCodeShow.value)){

       generateToastMsg(`${colorCodeShow.value} Copied!`);
   }else{
    alert('Your color is Invalid')
   }
   
   })

   colorCodeShow.addEventListener('keyup', function(e){
    const color = e.target.value;

    if(color && isValidColor(color)){
        colorContainer.style.backgroundColor = color;
        console.log(color)
        console.log(colorContainer)
    }
   })





} // main function end 

// step 2 - random RGB color generator function
function GenerateHexColor() {
    // rgb(0,0,0) && rgb(255, 255, 255)
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    
    //random hex color code
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return  `#${red}${green}${blue}`;


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
    if(color.length !== 7) return false;
    if(color[0] !== '#') return false;

    color = color.substring(1)
    
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}
