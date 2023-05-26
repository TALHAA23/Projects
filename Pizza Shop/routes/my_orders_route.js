const express = require('express');
const Route = express.Router();
const fs = require('fs');
Route.use(express.urlencoded({
    extended: 1
}));


Route.get('/', (req, res) => {
    //open_db opens database file having all orders.
    const open_db = JSON.parse(fs.readFileSync('./db/orders_database.json', 'utf-8'));
    const requestedReferId = req.query;

    /* 
    on first visit render my_orders
    after visitng this part of code will always be skipped
    */
    if (!Object.keys(requestedReferId).length) {
        return res.render('my_orders');
    }

    //Filter the open_db array for customer query
    const findOrder = open_db.filter(item => item.referenceId === requestedReferId.referenceId)[0];

    if (findOrder) {
        res.render('my_orders', {
            pizzaNameSize: findOrder.title,
            pizzaPrice: findOrder.amount
        })
    } else { //if no order render again with message
        res.render('my_orders', {
            receiptTitle: `No Order on ${requestedReferId.referenceId}`
        })
    }

})

module.exports = Route;