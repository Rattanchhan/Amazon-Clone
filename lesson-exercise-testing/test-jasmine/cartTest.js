// import {addToCart} from '../data/cart.js';

describe('test suite: addToCart',()=>{
  it('adds an existing products to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:'1'
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId:'2'
      }
    ]);
    });
    expect(localStorage.getItem.length).toEqual(1);
    // console.log(localStorage.getItem('cart'));
  });
  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    // console.log(localStorage.getItem('cart'));
    expect(localStorage.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});