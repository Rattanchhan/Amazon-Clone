import {cart} from '../data/cart-class.js'
import { loadCart } from '../data/cart.js';
import { getProduct, loadProductsFetch} from '../data/products.js';
import { orders } from '../data/order.js';
import { formatCurrency } from './utils/money.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { getDeliveryDate }  from '../script/checkout/orderSummary.js'


async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      new Promise((resolve) => {
        loadCart();
        resolve();
      })
    ]);

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

}

loadPage().then(()=>{
  document.querySelector('.js-cart-quantity').innerHTML = `${cart.quantityCount()}`;
  let html='';
  orders.forEach(order =>{
    html+=generateOrderHTML(order);
  });
  document.querySelector('.js-orders-grid').innerHTML=html;
  
})
function generateOrderHTML(order) {
  return `
      <div class="order-container">
        
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formatCurrency(order.total)}</div>
              </div>
            </div>
        
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d-${order.orderId}</div>
            </div>
          </div>
        
          <div class="order-details-grid">
              ${generateProductsHTML(order)}
          </div>
        </div>
      `
}

function generateProductsHTML(order) {
  let productHTML = '';
  order.products.forEach(product => {
    const matchingItemCart = cart.getCart(product.id);
    const deliveryOption = getDeliveryOption(matchingItemCart.deliveryOptionId);
    const stringDateTime=getDeliveryDate(deliveryOption);
    console.log(stringDateTime);
    productHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${stringDateTime}
            </div>
            <div class="product-quantity">
              Quantity: ${matchingItemCart.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `
  });
  return productHTML;
}

