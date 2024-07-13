import { getProduct } from "../../data/products.js";
import { cart,quantityCount} from "../../data/cart.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  let totalCents;
  let counts = quantityCount();

  cart.forEach((cartItem)=>{
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
  `
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}