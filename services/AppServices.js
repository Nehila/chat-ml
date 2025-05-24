import axios from 'axios';
 

const END_POINTAPI = `${process.env.NEXT_PUBLIC_API_URL}`

const instance = axios.create({
  baseURL: END_POINTAPI,
  timeout: 50000, 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'mode': "no-cors",
  },
});

instance.interceptors.request.use(function (config) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
    },
  };
});

const responseBody = (response) => response.data;


export const AppServices = {
  get: (body, url) => instance.get(END_POINTAPI + url, body).then(responseBody),

  post: (body, url) => instance.post(END_POINTAPI + url, body).then(responseBody),
};

export const GlobalManagement = {
  set: (key, val) => localStorage.setItem(key, val) 
}

export default AppServices;
