


// globals
const colorCodeShow = document.getElementById('colorCodeShow');
const inputButton = document.getElementById('inputbtn');

let copiedContainer = null;


// step 1 onload handler
window.onload = () => {
    main();
}
function main(){
    const colorContainer = document.getElementById('colorContainer');
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
    navigator.clipboard.writeText(colorCodeShow.value);
    if( copiedContainer !== null){
        copiedContainer.remove();
        copiedContainer = null;
        colorCodeShow.select()
    }
    generateToastMsg(`${colorCodeShow.value} Copied!`);
   
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


// if click colorCodeShow input button then select their value text & copied!

    colorCodeShow.addEventListener('click', () => {
        colorCodeShow.select();
        navigator.clipboard.writeText(colorCodeShow.value);
        const tostMsg = document.createElement('div')
        tostMsg.textContent = 'copied!';
        tostMsg.style.position = 'absolute';
        tostMsg.style.bottom = '5%';
        tostMsg.style.right = '32%';
        tostMsg.style.padding = '5px 10px';
        tostMsg.style.borderRadius = '5px';
        tostMsg.style.fontSize = '14px'
        inputButton.appendChild(tostMsg);

        // remove toastMessage after 0.7 second 
        setTimeout(() => {
            tostMsg.remove();
        }, 700 )
    })

