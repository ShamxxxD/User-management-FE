import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyByKSx7RP1V1C7_N6ZhLhB8keZpY3LoiSQ',
    authDomain: 'user-management-24176.firebaseapp.com',
    projectId: 'user-management-24176',
    storageBucket: 'user-management-24176.appspot.com',
    messagingSenderId: '799533790155',
    appId: '1:799533790155:web:9e9cf5e658e61d7aabfc4e',
    measurementId: 'G-6X0RHD04XC',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const avatarsStorage = 'user management/avatars/';
