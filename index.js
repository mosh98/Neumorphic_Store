const price = document.getElementById("price");
const changePriceButton = document.getElementById("pay");

//https://codingbeautydev.com/blog/javascript-cannot-read-property-addeventlistener-of-null/#:~:text=November%2014%2C%202022-,The%20%E2%80%9Ccannot%20read%20property%20'addEventListener'%20of%20null%E2%80%9D%20error,element%20absent%20from%20the%20DOM.
if (changePriceButton){
    changePriceButton.addEventListener("click", function() {
        //get inner html value
        //add extra 10 dollaz

        const priceValue = parseInt(price.innerHTML.replace("$",""),10);
        console.log(priceValue)
        price.innerHTML = "$"+(priceValue+100);
    });
}
