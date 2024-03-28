import {axiosInstance} from "./axios-http-client";


class PaymentService
{
  
    createTransaction(paymentInputDto)
    {
    return axiosInstance.post("http://localhost:8090/createTransaction/customer",paymentInputDto);
    }
    updatedPaymentStatus(orderId)
    {
    return axiosInstance.get("http://localhost:8090/paymentStatusUpdate/"+orderId);
    }
    getPaymentsByCustomerId(customerId){
        return axiosInstance.get('http://localhost:8090/paymentHistory/'+customerId);
    }
}
export default new PaymentService;