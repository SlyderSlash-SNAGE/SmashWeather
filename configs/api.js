import axios from 'axios'

export const weatherApi = axios.create({
    baseURL: 'http://api.weatherstack.com',
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    params: {
        'access_key':'b39ec1ee2cc1e519a2e587b3c414e5c8'
    }
})