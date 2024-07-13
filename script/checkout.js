import {renderOrderSummary} from './checkout/orderSummary.js';
import getToday from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';

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

renderOrderSummary();
renderPaymentSummary();
