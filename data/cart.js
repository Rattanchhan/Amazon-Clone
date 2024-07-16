export let cart;
loadCart();
export function loadCart(){
  cart = JSON.parse(localStorage.getItem('cart'))||[
    {
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
  ];
}
function saveToStrorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function removeLocalStorage(){
  localStorage.removeItem('cart');
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.id!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStrorage();
}
export function quantityCount(){
  let counts=0;
  cart.forEach((item)=>{
    counts+=item.quantity;
  })
  return counts;
}

export function addToCart(productId,quantity,select){
  let matchingItem;
  let cartQuantity=0;

  matchingItem=getCart(productId);

  if(matchingItem){
    if(select) matchingItem.quantity+=Number(select.value);
    else matchingItem.quantity=quantity;
  }
  else{
    const newCart = {
      id: productId,
      quantity:quantity,
      deliveryOptionId:'1'
    }
    cart.push(newCart);
    
  } 
  cart.forEach((item)=>{
    cartQuantity+=item.quantity;
  });
  saveToStrorage();
  return cartQuantity;
}

export function updateDeliveryOption(productId,deliveryId){
  let deliveryOption=getCart(productId);
  deliveryOption.deliveryOptionId=deliveryId;
  saveToStrorage();
}

export function getCart(productId){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.id){
       matchingItem=item;
    }
  });
  return matchingItem;
}