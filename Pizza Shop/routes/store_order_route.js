const express = require('express');
const Route = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const open_db = JSON.parse(fs.readFileSync('./db/orders_database.json', 'utf-8'));

Route.route('/')
    .get((req, res) => {
        res.json(open_db);
    })
    .post((req, res) => {
        const orderData = req.body;
        console.log(orderData);
        //If duplicate order is find it will be skip, happen when customer refreash page on recipt route 
        const findDuplicateRefernceId = open_db.find(item => item.referenceId === orderData.referenceId);

        if (!findDuplicateRefernceId) {
            open_db.push(orderData);
            fs.writeFileSync('./db/orders_database.json', JSON.stringify(open_db));
        };
        //if dulpicate find send 204 status
        res.sendStatus(204);
    })

module.exports = Route;