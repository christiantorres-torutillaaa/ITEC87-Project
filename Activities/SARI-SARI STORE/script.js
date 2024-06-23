window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-list a');
    const imageLogo = document.getElementById('logo-main');
    const cartIcon = document.getElementById('cart-icon')

    if (window.scrollY > 100) {
        navbar.style.backgroundColor = '#F2F5F5'; 
        navbar.style.transition ="250ms ease-in";
        imageLogo.src ='assets/logo/LOGO3.png';
        cartIcon.src='assets/images/cart.png'
        
        navLinks.forEach(link => {
            link.style.color = "#141413";
        });
    
    } else {
        navbar.style.backgroundColor = 'transparent'; 
        imageLogo.src ='assets/logo/LOGO3-WHITE.png';
        cartIcon.src='assets/images/cart2.png'

        navLinks.forEach(link => {
            link.style.color = "";
        });
    }
});

var oldStock = 0;

document.addEventListener('DOMContentLoaded', function() {
    let stocks = localStorage.getItem('stocks') || '';
    let stockObj = {};
    if (stocks) {
        stocks.split(';').forEach(item => {
            let [key, value] = item.split(':');
            if (key){
                stockObj[key] = Number(value);
            } 
        });
    }

    document.querySelectorAll('.product-child-container').forEach(container => {
        let shirtNameElement = container.querySelector('.product-name');
        let prodName = shirtNameElement.textContent;
        let getRemainingQuantity = container.querySelector('.remaining-stock');

        if (stockObj[prodName] !== undefined) {
            getRemainingQuantity.textContent = stockObj[prodName];
        }
    });
});


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cart-button')) {
        let prodContainer = event.target.closest('.product-child-container'); 

        let quantityElement = prodContainer.querySelector('.quantity');
        let finalQuantity = quantityElement.value;
        quantityElement.value= 0;
    
        let shirtNameElement = prodContainer.querySelector('.product-name');
        let prodName = shirtNameElement.textContent;

        let productPrice = prodContainer.querySelector('.product-price');
        let finalPrice = productPrice.textContent;
        finalPrice = finalPrice.substring(1);

        let imageFile = prodContainer.querySelector('.get-image');
        let imageSource = imageFile.src;

        let getSize = prodContainer.querySelector('.radio-value:checked');

        let getRemainingQuantity = prodContainer.querySelector('.remaining-stock');
        let finalRemainingStock = getRemainingQuantity.textContent;

        

        if(getSize == null){
            let newStock = finalRemainingStock - finalQuantity;
            getRemainingQuantity.innerHTML = newStock;
            addtoCartnoSize(finalQuantity, prodName, finalPrice, imageSource);
            updateStockInLocalStorage(prodName, newStock);
        }
        else{
            finalSize = getSize.value;
            if (getSize.checked) {
                getSize.checked = false;
            }   
            addtoCart(finalSize, finalQuantity, prodName, finalPrice, imageSource);
            let newStock = finalRemainingStock - finalQuantity;
            getRemainingQuantity.innerHTML = newStock;
            updateStockInLocalStorage(prodName, newStock);
        }  
    }
});

var oldPrice = 0;


function addtoCart(size, quantity, prod, price, image){
    var pricePerItem = quantity*price;
    alert("Added to Cart");

    document.getElementById('no-item').innerHTML = '';
    
    let cartContainer = document.getElementById('inside-cart-container');
    let createDiv = document.createElement('div');
    createDiv.className = 'createdContainerDiv';
    cartContainer.appendChild(createDiv);

    let nestDiv = document.createElement('div');
    nestDiv.className = "product-details-div";
    
    let createHeaderProduct = document.createElement('h2');
    createHeaderProduct.textContent = prod;

    let createParagraphforPrice = document.createElement('h4');
    createParagraphforPrice.textContent ="Price: " + pricePerItem;

    let createParagraphforQuantity = document.createElement('h4');
    createParagraphforQuantity.textContent ="Qty: " + quantity;

    let createParagraphforSize = document.createElement('h4');
    createParagraphforSize.textContent ="Size: " + size;

    let createImage = document.createElement('img');
    createImage.src = image;

    let getFinalPrice = document.getElementById('final-price');
    getFinalPrice.innerHTML = oldPrice += pricePerItem;
    
    createDiv.appendChild(createImage);
    createDiv.appendChild(nestDiv);
    nestDiv.appendChild(createHeaderProduct);
    nestDiv.appendChild(createParagraphforSize);
    nestDiv.appendChild(createParagraphforQuantity);
    nestDiv.appendChild(createParagraphforPrice);

    
}

function addtoCartnoSize(quantity, prod, price, image){

    var pricePerItem = quantity*price;
    alert("Added to Cart");

    document.getElementById('no-item').innerHTML = '';
    
    let cartContainer = document.getElementById('inside-cart-container');
    let createDiv = document.createElement('div');
    createDiv.className = 'createdContainerDiv';
    cartContainer.appendChild(createDiv);

    let nestDiv = document.createElement('div');
    nestDiv.className = "product-details-div";
    
    let createHeaderProduct = document.createElement('h2');
    createHeaderProduct.textContent = prod;

    let createParagraphforPrice = document.createElement('h4');
    createParagraphforPrice.textContent ="Price: " + pricePerItem;

    let createParagraphforQuantity = document.createElement('h4');
    createParagraphforQuantity.textContent ="Qty: " + quantity;

    let createImage = document.createElement('img');
    createImage.src = image;

    let getFinalPrice = document.getElementById('final-price');
    getFinalPrice.innerHTML = oldPrice += pricePerItem;
    
    createDiv.appendChild(createImage);
    createDiv.appendChild(nestDiv);
    nestDiv.appendChild(createHeaderProduct);
    nestDiv.appendChild(createParagraphforQuantity);
    nestDiv.appendChild(createParagraphforPrice);



}

function checkCash(){
    let cash = document.getElementById('cash-amount').value;
    let price = document.getElementById('final-price').textContent;

    if(cash < price){
        alert("Insufficient Amount");
    }
    else{
        alert("Thank you for shopping!");
        document.getElementById('amount-change').innerHTML = cash-price;
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('stocks-button')) {
        let prodContainer = event.target.closest('.product-child-container'); 

        let quantityElement = prodContainer.querySelector('.quantity');
        let finalQuantity = quantityElement.value;
        quantityElement.value= 0;
    
        let shirtNameElement = prodContainer.querySelector('.product-name');
        let prodName = shirtNameElement.textContent;
     
        let getRemainingQuantity = prodContainer.querySelector('.remaining-stock');
        let finalRemainingStock = getRemainingQuantity.textContent;


		let newStock = parseInt(finalRemainingStock) + parseInt(finalQuantity);
        updateStock(prodContainer, newStock, prodName);
    }
});

function updateStock(prodContainer, newStock, prodName){

    alert('Added to Stocks');
    let getRemainingQuantity = prodContainer.querySelector('.remaining-stock');
    getRemainingQuantity.innerHTML = newStock;
    
    updateStockInLocalStorage(prodName, newStock);
}


function updateStockInLocalStorage(productName, newStock) {
    let stocks = localStorage.getItem('stocks') || '';
    let stockObj = {};
    if (stocks) {
        stocks.split(';').forEach(item => {
            let [key, value] = item.split(':');
            if (key){
                stockObj[key] = Number(value);
            } 
        });
    }
    stockObj[productName] = newStock;
    let entries = Object.entries(stockObj);
    let mappedEntries = entries.map(([key, value]) => `${key}:${value}`);
    stocks = mappedEntries.join(';');
    
    localStorage.setItem('stocks', stocks);
}


function getDiscount(disc, type){
    let price = document.getElementById('final-price');
    let finalPrice = price.textContent;
    
    let discountedPrice = finalPrice-(finalPrice*disc);
    price.innerHTML = discountedPrice;

    let typeofdiscount = document.getElementById('disc-type');
    typeofdiscount.innerHTML = type;

    let discount = document.getElementById('disc-value');
    discount.innerHTML = "-" + finalPrice*disc;
}