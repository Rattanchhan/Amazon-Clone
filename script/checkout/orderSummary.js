import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

let cartItemsHTML='';
let index=0;
let timeOutId;

export function test(){
  const deliveryDays =7;
  let today = dayjs();
  let dayOfWeek = today.format('dddd');
  let countDays = 0;
  
  while(1){
    if(countDays<deliveryDays){
      if(dayOfWeek==='Saturday' || dayOfWeek==='Sunday'){
        countDays=countDays;
      }
      else{
        countDays++;
      }
    }
    else{
      break;
    }
    today = today.add(1,'days');
    dayOfWeek = today.format('dddd');
  }
}

export default function getToday(){
  return dayjs();
}
//removeLocalStorage();
/*const today = dayjs();
const deliveryDate = today.add(7,'days');

console.log(deliveryDate.format('dddd, MMMM D'));
*/

export function renderOrderSummary(){
quantityLoad();
//******************* Test *************/
// cartItemsHTML='';
//**************************************/
cart.cartItem.forEach((cartItem)=>{
  const productId = cartItem.id;
  let matchingItem=getProduct(productId);
  cartItemsHTML+=generateHTML(matchingItem,cartItem);
});

function quantityLoad(){
  document.querySelector('.js-quantity-checkout').innerHTML= `${cart.quantityCount()} itmes`;
}

document.querySelector('.js-order-summary').innerHTML=cartItemsHTML;
document.querySelectorAll('.js-update-link').
forEach((link)=>{
  link.addEventListener('click',()=>{
    cart.forEach((item)=>{
      const updateLinkElement=document.querySelector(`.js-cart-item-container-${item.id}`);
      if(link.dataset.productId===item.id){
        updateLinkElement.classList.add('is-editing-quantity');
      }
      else{
        if(updateLinkElement.classList.contains('is-editing-quantity')){
          updateLinkElement.classList.remove('is-editing-quantity');
        }
      }
    })
  });
});

document.querySelectorAll('.js-save-link').
forEach((link)=>{
  link.addEventListener('click',()=>{
    updateQuantity(link);
  });
});

function updateQuantity(link){
  cart.cartItem.forEach((item)=>{
    const saveLinkElement=document.querySelector(`.js-cart-item-container-${item.id}`);
      if(saveLinkElement.classList.contains('is-editing-quantity')){
        saveLinkElement.classList.remove('is-editing-quantity');
      }
  });

  const productId=link.dataset.productId;
  const inputValue=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  cart.addToCart(productId,inputValue,undefined);
  quantityLoad();
  document.querySelector(`.js-quantity-label-${productId}`).innerHTML=inputValue;
  renderPaymentSummary();
}

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    cart.removeFromCart(productId);
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    quantityLoad();
    renderPaymentSummary();
  });
});

function getDeliveryDate(deliveryOption){
  const deliveryDays =deliveryOption.deliveryDays;
  let today = dayjs();
  let dayOfWeek = today.format('dddd');
  let countDays = 0;
  
  while(1){
    if(countDays<deliveryDays){
      if(dayOfWeek==='Saturday' || dayOfWeek==='Sunday'){
        countDays=countDays;
      }
      else{
        countDays++;
      }
    }
    else{
      break;
    }
    today = today.add(1,'days');
    dayOfWeek = today.format('dddd');
  }
  
  return today.subtract(1,'days').format('dddd MMM D');
}

function generateHTML(value,cartItem){
  let deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption=getDeliveryOption(deliveryOptionId);
  const dateString=getDeliveryDate(deliveryOption);

  return (
    `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${value.id}">
        <div class="delivery-date js-delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${value.image}>

          <div class="cart-item-details">
            <div class="product-name js-product-name-${value.id}">
              ${value.name}
            </div>
            <div class="product-price js-product-price-${value.id}">
              ${value.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${value.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${value.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${value.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${value.id}"
              data-product-id="${value.id}">
              <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${value.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${value.id}"
              data-product-id="${value.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(value,cartItem)}
          </div>
        </div>
      </div>
    `
  );

}

document.querySelectorAll('.quantity-input').forEach((link)=>{
  link.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      updateQuantity(link);
    }
  })
});

function deliveryOptionsHTML(matchingItem,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const dateString=getDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents===0?
    'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html+=
    `
      <div class="delivery-option js-delivery-option​​​ 
      ​js-delivery-option-${matchingItem.id}-${deliveryOption.id}"
      data-product-id="${matchingItem.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked?'checked':''}
          class="delivery-option-input 
          ​js-delivery-option-input-${matchingItem.id}-${deliveryOption.id}"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>

    `
  });
  return html;
}

document.querySelectorAll('.js-delivery-option').
forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=option.dataset;
    cart.updateDeliveryOption(productId,deliveryOptionId);
    const cartContainerElement = document.querySelector(`.js-cart-item-container-${productId}`);
    let deliveryOption=getDeliveryOption(deliveryOptionId);
    const dateString=getDeliveryDate(deliveryOption);
    cartContainerElement.querySelector('.js-delivery-date').innerHTML=
    `Delivery date: ${dateString}`;
    renderPaymentSummary();
  });
});

function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
      if(deliveryOptionId===option.id){
        deliveryOption=option;
      }
    });
    return deliveryOption;
}
}

