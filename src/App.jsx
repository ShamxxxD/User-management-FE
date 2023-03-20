import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import Header from '~/layouts/Header';
import Footer from '~/layouts/Footer';
import { useStore } from '~/store';
import { useEffect } from 'react';
import { actions } from '~/store';

function App() {
    const [state, dispatch] = useStore();
    const isLogin = localStorage.getItem('accessToken') ? true : false;

    useEffect(() => {
        dispatch(actions.isUserLogin(isLogin));
    }, []);

    return (
        <div className='App'>
            <Header isLogin={isLogin} />

            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
