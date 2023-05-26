const PORT = 3000;
const express = require('express');
const app = express();
const multer = require('multer'); //handle multipart form data
const upload = multer();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(function (req, res, next) {
    if (req.originalUrl && req.originalUrl.split('/').pop() == 'favicon.ico') {
        res.sendStatus(204);
    }
    next();
})

/* Home Route */
app.get('/', (req, res) => {
    res.render('home');
})

/* confirmation order route */
const confirmationRoute = require('./routes/confirm_order_route');
app.use('/confirm-order', confirmationRoute);

/* store Order's route */
const storeOrder = require('./routes/store_order_route');
app.use('/orders', upload.any(), storeOrder);

/* render existing order's route */
const myOrders = require('./routes/my_orders_route');
app.use('/my-orders', myOrders)

app.listen(PORT, () => console.log('Listing on protal ', PORT));