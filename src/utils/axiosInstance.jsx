import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:3001/api';

axiosClient.defaults.headers = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 5000;

axiosClient.defaults.withCredentials = true;

async function getRequest(URL, payload) {
   const response = await axiosClient.get(`/${URL}`, payload);
   return response;
}

async function postRequest(URL, payload) {
   const response = await axiosClient.post(`/${URL}`, payload);
   return response;
}

async function patchRequest(URL, payload) {
   const response = await axiosClient.patch(`/${URL}`, payload);
   return response;
}

async function deleteRequest(URL, payload) {
   const response = await axiosClient.delete(`/${URL}`, payload);
   return response;
}

export { getRequest, postRequest, patchRequest, deleteRequest };
