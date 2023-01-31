import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Configure';
import NavigationServices from '../Navigation/Rootroute/navigation_reference';

const client = axios.create({
    // baseURL:'http://newresourcing.nimapinfotech.com/api',
    baseURL: BASE_URL,
    headers: {
        'Content-Type':'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
});


client.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        console.log("Token For Authrization",token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    },
);


client.interceptors.response.use(
    function (response) {
        console.log("Logout Response",response)
        return response;
    },
    async function (error) {
        if (error && error.response && error.response.status === 401) {
            if (error.response.data.message === 'Unauthorized') {
                await AsyncStorage.removeItem('token');
                NavigationServices.replace('Logout');
            } else {
                return Promise.reject(error);
            }
        }

        if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    },
);

const request = async options => {
    console.log("Request Option",options)
    const onSuccess = response => {
        console.log("Onsuccessss",response)
        return response;
    };

    const onError = error => {
        console.log("error response",error.response,error.message)
        return Promise.reject(error.response || error.message);
    };

    try {
        console.log("options=>>>",options)
        const response = await client(options);
        console.log("response=68",response)
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};

export default request;