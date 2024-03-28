import {axiosInstance} from "./axios-http-client"
class VehicleService{
    getAllVehicles(){
        return axiosInstance.get('http://localhost:8090/availableVehicles')
    }

    getVehicleById(id)
    {
        return axiosInstance.get("http://localhost:8090/vehicle/get/"+id);
    }
}

export default new VehicleService;