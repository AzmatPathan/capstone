import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoginScreen from './screens/loginScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from './screens/registerScreen';
import EquipmentScreen from './screens/dashboard/equipmentScreen';


import ForgotPassword  from './screens/ForgotPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/dashboard' element={<EquipmentScreen />} />
      <Route path='/forgot' element={<ForgotPassword />}/>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
