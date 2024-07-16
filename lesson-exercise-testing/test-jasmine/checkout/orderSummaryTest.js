import {loadCart,cart} from '../../data/cart.js';
import {renderOrderSummary} from '../../script/checkout/orderSummary.js';

describe('test suite: renderOrderSummary',()=>{
  
  const productId= "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2= "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(()=>{

    spyOn(localStorage,'setItem');
    
    document.querySelector('.js-test-container').innerHTML=`
    <div class="js-order-summary"></div>
    `;

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'1'
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'2'
      },
      {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity:3,
        deliveryOptionId:'1'
      },
      {
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity:5,
        deliveryOptionId:'3'
      },
      {
        id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity:10,
        deliveryOptionId:'2'
      },
      {
        id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        quantity:6,
        deliveryOptionId:'1'
      }
    ]);
    });
    loadCart();
    renderOrderSummary();
  });

  it('displays the cart',()=>{

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(12);
    const productId= "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    expect(document.querySelector(`.js-product-quantity-${productId}`).innerText).toContain('Quantity: 2');

    document.querySelector('.js-test-container').innerHTML='';
  });

  it('remove a product',()=>{

    document.querySelector(`.js-delete-link-${productId}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(5);
    expect(document.querySelector(`.js-cart-item-container-${productId}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    expect(cart.length).toEqual(5);
    expect(cart[0].id).toEqual(productId2);
    document.querySelector('.js-test-container').innerHTML='';
  });
})

