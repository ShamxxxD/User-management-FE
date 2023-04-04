import Home from '~/pages/Home/Home';
import AdminUserDashboard from '~/pages/Admin/AdminUserDashboard';
import Register from '~/pages/Auth/Register';
import Login from '~/pages/Auth/Login';
import Profile from '~/pages/Profile/Profile';
import ChangePassword from '~/pages/Profile/ChangePassword';
import Message from '~/pages/Message/Message';
import TweetDetail from '~/pages/TweetDetail/TweetDetail';
import Notifications from '~/pages/Notifications/Notifications';
import Bookmarks from '~/pages/Bookmarks/Bookmarks';

export const publicRoutes = [
    { path: '/auth/register', component: Register },
    { path: '/auth/login', component: Login },
    { path: '/posts/:id', component: TweetDetail },
];
export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/notifications', component: Notifications },
    { path: '/messages', component: Message },
    { path: '/bookmarks', component: Bookmarks },
    { path: '/admin/users', component: AdminUserDashboard },
    {
        path: '/profile/:id',
        component: Profile,
    },
    {
        path: '/profile/:id/change-password',
        component: ChangePassword,
    },
];
