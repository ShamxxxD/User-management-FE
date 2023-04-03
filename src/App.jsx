/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import jwtDecode from 'jwt-decode';
import { Routes, Route, useNavigate, redirect } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { actions } from '~/store';
import { useEffect } from 'react';
import { useStore } from './store';

function App() {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStore();

    const isLogin = Object.keys(user).length === 0 && user.constructor === Object;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return navigate('/auth/login');
        }
        const jwtDecoded = jwtDecode(accessToken);
        dispatch(actions.setUser(jwtDecoded.user));
    }, []);

    return (
        <div className='App'>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}

                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return !isLogin && <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
