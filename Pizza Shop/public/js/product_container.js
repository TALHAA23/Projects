const productFrame = document.querySelector('.product-container');

//@param data: take array of product
export async function createContainers(data) {
    const productData = await data;

    productData.forEach(product => {
        const item = document.createElement('div');
        productFrame.append(item);
        item.classList.add('item');
        item.innerHTML = html(product);

        //clickListeners add click events to these dynamically added elements
        //@param item: item is evey newly created container
        clickListeners(item);
    })
};

function html(product) {
    return `
                <h1>${product.title}</h1>
                <img src='${product.img_address}'>
                <p class='price'>
                     Price: <b>$</b>${product.price.medium}<sup>99</sup>
                </p>
    
                <div class='purchase-controls'>
                <form method='post'>
                    <input type='hidden' name='title' value='${product.title}'>
                    <input type='hidden' name='price' value='${product.price.medium}'>
                    <input type='hidden' name='img' value='${product.img_address}'>
                    <button class="add-to-chart-btn" type='submit'>Add to Order</button>
                </form>
                    <button class="read-desc-btn">Read Description</button>
                </div>
    
                <div class="description">
                    <p>${product.desc}</p>
                    <button>collapse</button>
                </div>
        `
}

function clickListeners(item) {
    const addToChartBtn = item.querySelector('.add-to-chart-btn');
    const desc = item.querySelector('.description');
    const readDesc = item.querySelector('.read-desc-btn');
    const collapseDesc = item.querySelector('.description button');
    const formEL = item.querySelector('form');
    readDesc.onclick = () => desc.style = 'height:70%';
    collapseDesc.onclick = () => desc.style = 'height:0%';
    formEL.onsubmit = () => {
        event.preventDefault();
        formEL.action = '/confirm-order'; //send to confirmation after add-to-order
        formEL.submit();
    }
}