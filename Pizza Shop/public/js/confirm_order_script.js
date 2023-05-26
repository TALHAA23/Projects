const formEl = document.querySelector('form');
const currentPizzaName = document.querySelector('.order-sheet h1').innerHTML;
const priceTag = document.querySelector('.price-tag input');
const [dineIn, delivery, takeAway] = document.querySelectorAll('.serveMode input[type="radio"]');
const extras = document.querySelectorAll('.extras input');
const [small, medium, large] = document.querySelectorAll('.pizza-size input[type="radio"]')
const serveModeContainer = document.querySelector('.serveMode');
const pizzaSizeContainer = document.querySelector('.pizza-size')
const serverModeHiglighter = document.querySelector('.serveMode .hightLighter');
const pizzaSizeHighlighter = document.querySelector('.pizza-size .hightLighter');

/*
IMPORTANT NOTES
instead of using localAPI use your create array
import that from home.js here, you have to export form home.js
change views/confirm_order.ejs script type to module
 */
const pizzaPriceList = fetch('http://localhost:3030/food-api')
    .then(response => response.json())
    .then(response => response.find(item => item.title === currentPizzaName))
    .then(response => response.price)

//Pre-checked
medium.checked = true;
delivery.checked = true;

//Trasition on size and mode
serveModeContainer.onclick = () => {
    if (dineIn.checked)
        serverModeHiglighter.style = 'translate:-108%';
    else if (delivery.checked)
        serverModeHiglighter.style = 'translate:0%';
    else
        serverModeHiglighter.style = 'translate:108%';
}
pizzaSizeContainer.onclick = async () => {
    const getPizzaPrice = await pizzaPriceList;
    if (small.checked) {
        pizzaSizeHighlighter.style = 'translate:-108%';
        priceTag.value = getPizzaPrice.small;
    } else if (medium.checked) {
        pizzaSizeHighlighter.style = 'translate:0%';
        priceTag.value = getPizzaPrice.medium;
    } else {
        pizzaSizeHighlighter.style = 'translate:108%';
        priceTag.value = getPizzaPrice.large;
    }
}


formEl.onsubmit = async () => {
    event.preventDefault();
    formEl.submit();
}