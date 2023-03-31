import Home from '~/pages/Home/Home';
import AdminUserDashboard from '~/pages/Admin/AdminUserDashboard';
import Register from '~/pages/Auth/Register';
import Login from '~/pages/Auth/Login';
import Profile from '~/pages/Profile/Profile';
import ChangePassword from '~/pages/Profile/ChangePassword';
import Message from '~/pages/Message/Message';

export const publicRoutes = [
    { path: '/auth/register', component: Register },
    { path: '/auth/login', component: Login },
];
export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/messages', component: Message },
    { path: '/admin/users', component: AdminUserDashboard },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/profile/change-password',
        component: ChangePassword,
    },
];
