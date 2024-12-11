import axios from 'axios';
import { API_BASE_URL } from './constants';
import store from '../configaration/store' 
import { removeUserData } from '../configaration/reducerFunction';


const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const logout = () => {
  store.dispatch(removeUserData());
};


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
api.interceptors.response.use(

  (response) => {
    //console.log(2222,response);
    
    return response.data;  
  },
  (error) => {
   // console.log(400,error.response.data);
    
    if(error.response.data.message=='User Token Not Found'){
      // console.log('logout');
      logout()
    }
    return Promise.reject(error);
  }
);

export default api;
//Url Shorter Back-end