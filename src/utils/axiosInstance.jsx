import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:3001/api';

axiosClient.defaults.headers = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

async function getRequest(URL) {
   const response = await axiosClient.get(`/${URL}`);
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

async function deleteRequest(URL) {
   const response = await axiosClient.delete(`/${URL}`);
   return response;
}

export { getRequest, postRequest, patchRequest, deleteRequest };
