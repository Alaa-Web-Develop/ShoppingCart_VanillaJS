//document ready :
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for(let x = 0 ; x < removeCartItemButtons.length ; x++){
        let button = removeCartItemButtons[x];
        button.addEventListener('click', removeCartItem)
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for(var i = 0 ; i < quantityInputs.length;i++){
            var input = quantityInputs[i]
            input.addEventListener('change',quantityChanged)
        }

        var addToCardButtons = document.getElementsByClassName('shop-item-button')
        for(var i = 0 ; i < addToCardButtons.length ; i++){
            var button = addToCardButtons[i]
            button.addEventListener('click',addToCartClicked)
        }
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}
function purchaseClicked(){
    alert('Thanks for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //loop to remove child
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title,price,imageSrc);
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}
function addItemToCart(title ,price,imageSrc){
    //create row 
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row'); // add class to div to style
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //check if items already added before
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i =0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText == title){
            alert('this item is already added to the cart')
            return //to stop excute the beloww code
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow) // append to the end
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}


function updateCartTotal (){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')

    let total = 0;
    for(let x = 0;x < cartRows.length;x++){
        let cartRow = cartRows[x]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$',''))
        let quantity = quantityElement.value

        total = total + (price*quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



//navbar :
let srchbtn = document.querySelector('#search-icon');
let srccontr = document.querySelector('.head-frm');

srchbtn.addEventListener('click', () => {
    srchbtn.classList.toggle('fa-times');
    srccontr.classList.toggle('active');
})