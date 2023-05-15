import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';
import { getItem, addItem, removeItem } from './LocaleStorage';
const sign = require('jwt-encode');

export function hasAuthenticated() {
    const token = getItem('miniblogToken');
    const result = token ? tokenIsValid(token) : false;

    if (false === result) {
        removeItem('miniblogToken');
    }

    return result;
}

export function login(credentials) {
    return axios
        .get('http://localhost:3000/user')
        .then(response => response.data)
        .then(data => {
            let breakForEach = false;
            data.forEach(e => {
                if(e.username == credentials.username && e.password == credentials.password && breakForEach == false){
                    const token = sign(credentials, 'test');
                    addItem('miniblogToken', token);
                    breakForEach = true;
                    console.log(token);
                }
            });
            if(breakForEach){
                return true;
            }
        });
}

export function logout() {
    removeItem('miniblogToken');
}

function tokenIsValid(token) {
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
        return true;
    }

    return false;
}