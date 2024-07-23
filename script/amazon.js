import {products} from '../data/products.js';
import {cart} from '../data/cart-class.js'
// import { formatCurrency } from './utils/money.js';

let productsHTML='';
let index=0;
let timeOutId;

document.querySelector('.js-cart-quantity').innerHTML= `${cart.quantityCount()}`
products.forEach(value=>{
 productsHTML+= generateHTML(value);
});

document.querySelector('.js-products-grid').innerHTML=productsHTML;
document.querySelectorAll('.added-to-cart').forEach((value)=>
{
  value.classList.add(`add-to-cart-${products[index].id}`);
  index++;
});

document.querySelectorAll('.js-add-to-cart').
forEach((button)=>{
  button.addEventListener('click',()=>{
    const select = document.querySelector(`.js-quantity-selector-${button.dataset.productId}`);
    const productId = button.dataset.productId;
    const quantity=Number(`${select.value}`);  
    
    document.querySelector('.js-cart-quantity').innerHTML=`${cart.addToCart(productId,quantity,select)}`;  
    classList(productId);
  });
});

function generateHTML(value){
  return (
    `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${value.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${value.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src=${value.getStarUrl()}>
      <div class="product-rating-count link-primary">
        ${value.rating.count}
      </div>
    </div>

    <div class="product-price">
       ${value.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${value.id}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    ${value.extraInforHTML()}
    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${value.id}">
      Add to Cart
    </button>
  </div>
  `);
}


function classList(productId){
  products.forEach((item)=>{ 
    let productIdElement;
    if(productId===item.id){
      productIdElement =  document.querySelector(`.add-to-cart-${productId}`); 
      productIdElement.classList.add('is-add-to-cart');
      if(timeOutId){
        clearTimeout(timeOutId);
      }
        timeOutId=setTimeout(function(){
          productIdElement.classList.remove('is-add-to-cart');
        },2000) 
    }
    else{
      productIdElement = document.querySelector(`.add-to-cart-${item.id}`);
      if(productIdElement.classList.contains('is-add-to-cart')){
        productIdElement.classList.remove('is-add-to-cart');
      }
    }
  });
}

