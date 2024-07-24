import {renderOrderSummary} from './checkout/orderSummary.js';
// import getToday from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCartTest } from '../data/cart.js';
// import '../data/backend-practice.js';
// import '../data/cart-oop.js'
// import '../data/cart-class.js'
//import '../data/car.js'
// test();

// let today = getToday();
// today=today.add(1,'months');
// console.log(today.format('MMM dddd'));

// let totalTodays=today.subtract(1,'months');
// console.log(totalTodays.format('MMM D'));

// console.log(today.format('dddd'));
// console.log(isWeekend(today));

// function isWeekend(date){
//   let day = date.format('dddd');
//   if(day==='Saturday' || day==='Sunday'){
//     return day + " is weekend";
//   }
//   else{
//     return day + " is not weekend";
//   }
// }

Promise.all([
   loadProductsFetch(),
   new Promise((resolve) => {
      loadCartTest(() => {
         resolve();
      });
   })
]).then(()=>{
   renderOrderSummary();
   renderPaymentSummary();
})

// new Promise((resolve)=>{
//    loadProducts(()=>{
//       resolve();
//    })
// }).then(()=>{
//    return new Promise((resolve)=>{
//       loadCart(()=>{
//          resolve();
//       });
//    });
// }).then(()=>{
//    renderOrderSummary();
//    renderPaymentSummary();
// });


// loadProducts(()=>{
//    renderOrderSummary();
//    renderPaymentSummary(); 
// });


