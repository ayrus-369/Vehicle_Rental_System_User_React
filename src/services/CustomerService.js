import {axiosInstance} from "./axios-http-client"
class CustomerService{

    login(loginData){
        return axiosInstance.post('http://localhost:8090/customer/login',loginData);
    }

    getCustomerById(customerId){
        return axiosInstance.get('http://localhost:8090/customer/'+customerId);
    }

    register(customer)
    {
        return axiosInstance.post('http://localhost:8090/customer',customer);
    }

    update(customer){
        return axiosInstance.put('http://localhost:8090/customer/updateProfile',customer);
    }

    getBookingsByCustomerEmail(customerEmail){
            return axiosInstance.get('http://localhost:8090/booking/customer/'+customerEmail);
    }
   
}

export default new CustomerService();