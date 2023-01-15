//open & close cart
const cartIcon= document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart=document.querySelector("#cart-close");

cartIcon.addEventListener("click",()=>{
    cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});
//start when de document is ready
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',start)
}else {
start();
}
function start(){
    addEvents();
}
function update(){
    addEvents();
    updateTotal();
}
function addEvents(){


//remove items
let cartRemove_btns = document.querySelectorAll(".cart-remove");
console.log(cartRemove_btns);
cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click",handle_removeCartItems);
});
//change item quantity
let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
cartQuantity_inputs.forEach(input =>{
    input.addEventListener("change", handle_changeItemQuantity);
}
    )
//add items to cart
let addCarts_btns = document.querySelectorAll(".add-cart");
addCarts_btns.forEach((btn) => {
    btn.addEventListener("click",handle_addCartItem);
})
let itemsAdded =[];
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".img-product").src;
    console.log(title,price,imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    if (itemsAdded.find((el) => el.title== newToAdd.title) ){
     alert("this item is already exist");
     return;}
     else{
        itemsAdded.push(newToAdd);
     }
    //add produt to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML= cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    updateTotal();
   
}

}function handle_removeCartItems(){
    this.parentElement.remove();
     itemsAdded=itemsAdded.filter(
        (el) =>
        el.title =!
        this.parentElement.querySelector(".cart-product-title").innerHTML);
     
    update();
}
function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    this.value = Math.floor(this.value);
    update();
}
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement= cart.querySelector(".total-price");
    let total= 0;
    cartBoxes.forEach ((cartBox) => {
        let priceElement= cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity= cartBox.querySelector(".cart-quantity").value;
        total +=price*quantity;
    });
        total= total.toFixed(2);
        totalElement.innerHTML="$" + total;
}
//html component
function CartBoxComponent(title,price,imgSrc){
    return `
    <div class="cart-box">
     <img src=${imgSrc} alt="" class="cart-img">
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity">
</div>

<i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}

