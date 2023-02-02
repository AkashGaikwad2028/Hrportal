import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Configure';
import NavigationServices from '../Navigation/Rootroute/navigation_reference';

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type":"multipart/form-data, "
    //   "Accept":'application/pdf,'
    },
    timeout: 10000,
});



client.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        console.log("tokekk",token)
        if (token) {
            console.log(" config",config)
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
        console.log("response=>>>>>>>>>>>>>",response)
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

const onSuccess = (response) => {
    console.log("response", response);
    console.log("rtequesstFormdataoptons=rresponse", response);
    return response;
  };

  const onError = (error) => {
    console.log("requestformdata", error.message, error.response);
    return Promise.reject(error.response || error.message);
  };

const requestformData = async (options) => {
    console.log("rtequesstFormdataoptons", options);
    try {
        const response = await client(options);
        return onSuccess(response);
      } catch (error) {
        return onError(error);
      }
  
  
  
  };

export default requestformData;

