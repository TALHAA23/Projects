const express = require('express');
const Route = express.Router();
Route.use(express.urlencoded({ //use for reading queries form get request
    extended: 1
}))

Route
    .route('/')
    .post((req, res) => {
        const pizzaSelectionDetails = req.body;
        res.render('confirm_order', {
            pizzaName: pizzaSelectionDetails.title,
            pizzaPrice: pizzaSelectionDetails.price,
            imgSrc: pizzaSelectionDetails.img
        })
    })

Route.post('/receipt', (req, res) => {
    const getOrder = req.body;
    let userMessage = null;

    console.log(getOrder)

    if (getOrder.serveMode === 'dine-in')
        userMessage = 'You Order will be ready, See you ;)'
    else if (getOrder.serveMode === 'delivery')
        userMessage = 'We will be their in like 20 Minutes'
    else if (getOrder.serveMode === 'take-away')
        userMessage = 'Head over in 10 minutes!'
    else
        userMessage = 'No Messag :/'

    res.render('recipt', {
        infoForUser: userMessage,
        pizzaName: getOrder.pizzaTitle,
        pizzaSize: getOrder.pizzaSize,
        pizzaPrice: getOrder.price,
        totalAmount: getOrder.price,
        topupArray: getOrder.topUp
    })
})


module.exports = Route;