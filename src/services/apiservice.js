import axios from "axios";
import { environment } from "../environments/environment";


function validateUser(data){
    return axios.post(`${environment.apiUrl}/login`,data)
}
function saveUser(data){
    return axios.post(`${environment.apiUrl}/register`,data)
}

function getUsers(page,itemsPerPage){
    return axios.get(`${environment.apiUrl}/users?page=${page}&pageSize=${itemsPerPage}`)
}
function deleteuserService(id){
    return axios.delete(`${environment.apiUrl}/${id}`)
}
function updateUser(id,data){
    return axios.put(`${environment.apiUrl}/${id}`,data)
}
export  {saveUser,validateUser,getUsers,deleteuserService,updateUser};