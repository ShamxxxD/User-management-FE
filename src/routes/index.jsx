import Home from '../pages/Home';
import Register from '~/pages/Register';
import Login from '~/pages/Login';

export const publicRoutes = [
     { path: '/', component: Home },
     { path: '/auth/register', component: Register },
     { path: '/auth/login', component: Login },
];
export const privateRoutes = [];
