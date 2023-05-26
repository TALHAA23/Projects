import {
    createContainers,
} from './product_container.js'

/*
Reset reference number on home page will delete saved refer id form prev order store in localStorage
*/
resetRefernceNumber();

const productContainer = document.querySelector('.product-container')

/*
IMPORTANT NOTES
You will have to delete the request menu because this is not available with you
Follow 1 of 2 ways
Way 1:
Create you own fetch api of pizza related data with
title, Price, desc, and other data

Way 2:
Create you own Array of product and use it.
Array should contain of Object
Object format should follow this format otherwise you will have to modify code
---Obejct FORMAT---
{
    title: sometitle,
    price:{
        small,medim,large and other sizes
    },
    img_address: address here,
    desc: description here
}
pass the newly created array to createContainers funciton remove .then form it
other part of code can be find in products_container.js file

*/

const requestMenu = fetch('http://localhost:3030/food-api')
    .then(response => response.json())
    .then(response => {
        return response.filter(item => item.catagory === 'pizza');
    })


//Imported form product_container.js
createContainers(requestMenu).then(() => {
    let product_container = document.querySelector('.product-container');
    if (product_container.children.length === 0)
        productContainer.innerHTML = 'no product available &#128549;'
})


function resetRefernceNumber() {
    localStorage.removeItem('referId');
}