import axios from 'axios'

const API_URL = '/api/';

const register = (name, username, password ) => {
    return axios.post(API_URL + "users", {
        username,
        name,
        password
    })
} 

const login = (username, password) => {
    return axios.post(API_URL + "login", {
        username,
        password
    }).then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    })
}

const logout = () => {
    localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout
}