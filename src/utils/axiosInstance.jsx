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
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers['token'] = `Bearer ${accessToken}`;
        const now = new Date().getTime();
        const jwtDecoded = await jwtDecode(accessToken);
        if (jwtDecoded.exp < now / 1000 && !isRefreshing) {
            isRefreshing = true;
            try {
                const response = await postRequest('auth/refresh');
                console.log('New Token: ', response.data.accessToken);
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
