import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import Header from '~/layouts/Header';
import Footer from '~/layouts/Footer';

function App() {
   return (
      <div className='App'>
         <Header />

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
