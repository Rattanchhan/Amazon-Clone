class Cart{
    cartItem = undefined;
    constructor(){
        this.#loadCart();
    }
    #loadCart() {
        this.cartItem = JSON.parse(localStorage.getItem('cart-oop')) || [
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];
    }
    saveToStrorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
    }
    removeLocalStorage() {
        localStorage.removeItem('cart-oop');
    }
    removeFromCart(productId) {
        const newCart = [];
        if (productId === null) { }
        else {
            this.cartItem.forEach((cartItem) => {
                if (cartItem.id !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItem = newCart;
            this.saveToStrorage();
        }
    }
    quantityCount() {
        let counts = 0;
        this.cartItem.forEach((item) => {
            counts += item.quantity;
        })
        return counts;
    }
    addToCart(productId, quantity, select) {
        let matchingItem;
        let cartQuantity = 0;

        matchingItem = this.getCart(productId);

        if (matchingItem) {
            if (select) matchingItem.quantity += Number(select.value);
            else matchingItem.quantity = quantity;
        }
        else {
            const newCart = {
                id: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            }
            this.cartItem.push(newCart);

        }
        this.cartItem.forEach((item) => {
            cartQuantity += item.quantity;
        });
        this.saveToStrorage();
        return cartQuantity;
    }
    updateDeliveryOption(productId, deliveryId) {
        let deliveryOption = this.getCart(productId);
        deliveryOption.deliveryOptionId = deliveryId;
        this.saveToStrorage();
    }
    getCart(productId) {
        let matchingItem;
        this.cartItem.forEach((item) => {
            if (productId === item.id) {
                matchingItem = item;
            }
        });
        return matchingItem;
    }
}

export const cart = new Cart();

// const cart = new Cart();
// // cart.#loadCart();
// cart.addToCart("54e0eccd-8f36-462b-b68a-8182611d9add",5,null);
// console.log(cart);
// console.log(cart instanceof Cart);