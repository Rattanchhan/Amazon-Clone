const cart={
    cartItem:undefined,
    loadCart(){
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
    },
    saveToStrorage(){
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
    },
    removeLocalStorage() {
        localStorage.removeItem('cart-oop');
    },

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
    },
    quantityCount() {
        let counts = 0;
        this.cartItem.forEach((item) => {
            counts += item.quantity;
        })
        return counts;
    },

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
    },

    updateDeliveryOption(productId, deliveryId) {
        let deliveryOption = this.getCart(productId);
        deliveryOption.deliveryOptionId = deliveryId;
        this.saveToStrorage();
    },

    getCart(productId) {
        let matchingItem;
        this.cartItem.forEach((item) => {
            if (productId === item.id) {
                matchingItem = item;
            }
        });
        return matchingItem;
    }
};

cart.loadCart();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e",'2',null);
console.log(cart.cartItem);