import { addToCart, loadCart,removeFromCart,cart } from "../../data/cart.js";

describe("track suite: localStorage",()=>{
    beforeEach(()=> {
      spyOn(localStorage,'setItem');

      spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([]);
      })
      loadCart();
      addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",3,null);
      addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d",4,null);
    });
    it("tracks that the spy was called",()=>{
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:3,
        deliveryOptionId:'1'
      },
    ]));
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
});

describe("track suite: remove from cart",()=>{
  const productId="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity:2,
          deliveryOptionId:'1'
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity:1,
          deliveryOptionId:'2'
        }
      ]);
    });
    loadCart();
  })
  
  it("remove productId that is in the cart",()=>{
    removeFromCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("remove productId that is not in the cart",()=>{
    removeFromCart(null);
    removeFromCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});