import paymentService from '../../services/PaymentService';


function OrderDetails(amount) {

  console.log("inside order Details");
  paymentService.createTransaction(amount)
    .then((resp) => {
      console.log(resp.data);
      // createRazorpayOrder(resp.data, amount);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Order confirm");
    });

    
}

export default OrderDetails;
