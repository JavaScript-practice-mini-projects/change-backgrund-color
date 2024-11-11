
//step
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
        const bgColor = GeneratorRGBColor();
        colorContainer.style.backgroundColor = bgColor;
   })
}

// step 2 - random RGB color generator function
function GeneratorRGBColor() {
    // rgb(0,0,0) && rgb(255, 255, 255)
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    
    return `rgb(${red}, ${green}, ${blue})`
}
