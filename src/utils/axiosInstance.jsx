import axios from 'axios';
import jwtDecode from 'jwt-decode';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

//All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 5000;

axiosClient.defaults.withCredentials = true;

let isRefreshing = false;
axiosClient.interceptors.request.use(async config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        const now = new Date().getTime();
        const jwtDecoded = await jwtDecode(token);

        if (jwtDecoded.exp < now / 1000 && !isRefreshing) {
            isRefreshing = true;
            try {
                const response = await postRequest('auth/refresh');
                console.log(response.data.accessToken);
                localStorage.setItem('accessToken', response.data.accessToken);
                config.headers['token'] = `Bearer ${response.data.accessToken}`;
            } catch (error) {
                console.error('Failed to refresh token', error);
            } finally {
                isRefreshing = false;
            }
        }
    }

    return config;
});

// // Response interceptor for API calls
// axiosClient.interceptors.response.use(
//     response => {
//         console.log('Run');
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;

//         // if (error.response.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const access_token = await postRequest('auth/refresh', {});

//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//         return axiosClient(originalRequest);
//         // }
//         // return Promise.reject(error);
//     }
// );

async function getRequest(URL, payload) {
    const response = await axiosClient.get(`/${URL}`, payload);
    return response;
}

async function postRequest(URL, data, config) {
    const response = await axiosClient.post(`/${URL}`, data, config);
    return response;
}

async function patchRequest(URL, payload, config) {
    const response = await axiosClient.patch(`/${URL}`, payload, config);
    return response;
}

async function deleteRequest(URL, payload) {
    const response = await axiosClient.delete(`/${URL}`, payload);
    return response;
}

export { getRequest, postRequest, patchRequest, deleteRequest };
export default axiosClient;
