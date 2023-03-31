/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import jwtDecode from 'jwt-decode';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { useStore } from './store';
import { actions } from '~/store';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();

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
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
