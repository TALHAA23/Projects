const amountColumn = document.querySelectorAll('.recipt table tbody tr td:last-child');
const refrenceNumber = document.querySelector('.reference-number b');
let totalAmountTag = document.querySelector('.total-amount p:last-child');
let totalAmount = 0;
const generateReferenceNumber = Math.floor(Math.random() * 9999);

amountColumn.forEach(item => {
    totalAmount += parseInt(item.innerHTML);
})

totalAmountTag.innerHTML = `$${totalAmount}`
//store refer id in localStorage to avoid storing same order again and again
//happen if user refresh page
refrenceNumber.innerHTML = localStorage.getItem('referId') || generateReferenceNumber;
localStorage.setItem('referId', refrenceNumber.innerHTML);

function storeReceipt() {
    //Js form
    var formData = new FormData();
    formData.append('title', document.querySelector('.recipt tbody td').innerHTML);
    formData.append('amount', totalAmount);
    formData.append('referenceId', refrenceNumber.innerHTML);

    fetch("http://localhost:3000/orders", {
        method: "POST",
        body: formData
    }).then(() => setInterval(() => document.querySelector('dialog').style.scale = '1', 2000));
}

storeReceipt();