import { getProduct, loadProductsFetch } from "../../data/products.js";
import getToday from "./orderSummary.js";
import { cart} from "../../data/cart-class.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js";
import { addOrder, orders } from "../../data/order.js";
export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  let totalCents=0;
  let counts = cart.quantityCount();

  let orderId = 0;

  cart.cartItem.forEach((cartItem)=>{
    const product = getProduct(cartItem.id);
    productPriceCents+=product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents;

  });
  const totalBeforeCents = productPriceCents+shippingPriceCents;
  const taxCents = (totalBeforeCents*10)/100;

  totalCents = totalBeforeCents + taxCents;
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${counts}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary
    js-place-order">
      Place your order
    </button>
  </div>
  `
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click',()=>{
    // try{
    //   const response = await fetch('https://supersimplebackend.dev/orders',{
    //     method:'POST',
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       cart: cart
    //     })
    //   });
    //   localStorage.removeItem('orders');
    //   const order = await response.json();
    //   addOrder(order);

    //   }catch(error){
    //   console.log('Unexpected error. Please try again later.');
    // }
    // window.location.href='orders.html';

    loadPage().then(() => {
      orderId= JSON.parse(localStorage.getItem('orderId'))||0;
      const product = [];
      cart.cartItem.forEach(item=>{
        product.push(getProduct(item.id));
      });

      console.log(cart);
      const order = {
        orderId:orderId+1,
        orderTime:getToday().format('MMM D'),
        total:Math.round(getTotal()),
        products:product
      }
      localStorage.setItem('orderId',JSON.stringify(orderId+1));
      addOrder(order);
      window.location.href='orders.html';
     });
     
    });
   

    async function loadPage() {
      try {
        const response = await loadProductsFetch();
        return response;
      } catch (error) {
        console.log('Unexpected error. Please try again later.');
      }

    }
    function getTotal(){
      productPriceCents = 0;
      shippingPriceCents = 0;
      totalCents = 0;

      cart.cartItem.forEach((cartItem) => {
        const product = getProduct(cartItem.id);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

      });
      const totalBeforeCents = productPriceCents + shippingPriceCents;
      const taxCents = (totalBeforeCents * 10) / 100;
      totalCents = totalBeforeCents + taxCents;

      return totalCents;
    }
}