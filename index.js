
//step
// step 1 onload handler
window.onload = () => {
    main();
}
function main(){
    const colorContainer = document.getElementById('colorContainer');
    const changeButton = document.getElementById('changeButton');
    const copyButton = document.getElementById('copyButton');
    const colorShow = document.getElementById('colorShow');

    //changeButton function call
   changeButton.addEventListener('click', function () {
        const bgColor = GeneratorRGBColor();
        colorContainer.style.backgroundColor = bgColor;
        colorShow.value = bgColor;
   })

   // color code copy button 
   copyButton.addEventListener('click', function(){
    navigator.clipboard.writeText(colorShow.value);
    generateToastMsg(`${colorShow.value} Copied!`);

   
   })
}

// step 2 - random RGB color generator function
function GeneratorRGBColor() {
    // rgb(0,0,0) && rgb(255, 255, 255)
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    
    return `rgb(${red}, ${green}, ${blue})`;
}

// generateToastMsg
function generateToastMsg(msg){
    const copiedContainer = document.createElement("div");
    copiedContainer.textContent = msg;
    copiedContainer.className = 'toastMessage toastMessage-slide-in';

  
    copiedContainer.addEventListener('click', function() {
        copiedContainer.classList.remove('toastMessage-slide-in');
        copiedContainer.classList.add('toastMessage-slide-out')
        copiedContainer.addEventListener('animationend', function() {
            copiedContainer.remove()
        })
    })

    document.body.appendChild(copiedContainer);
}

