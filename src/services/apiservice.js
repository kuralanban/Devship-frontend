import axios from "axios";
import { environment } from "../environments/environment";


function validateUser(data){
    return axios.post(`${environment.apiUrl}/login`,data)
}
function saveUser(data){
    return axios.post(`${environment.apiUrl}/register`,data)
}

export  {saveUser,validateUser};