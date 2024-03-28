import {axiosInstance} from "./axios-http-client"
class AdminService{

    login(loginData){
        return axiosInstance.post('http://localhost:8090/admin/login',loginData);
    }

}

export default AdminService;