import {axiosInstance} from "./axios-http-client"
class BookingService{
    createNewBooking(bookVehicle){
        return axiosInstance.post('http://localhost:8090/booking/vehicle',bookVehicle);
    }
}
export default new BookingService;