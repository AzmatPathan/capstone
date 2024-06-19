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
import HomeScreen from './screens/homeScreen';
import ForgotPassword from './screens/ForgotPassword';
import UploadImageScreen from './screens/dashboard/uploadImageScreen';
import EquipmentDetailScreen from './screens/dashboard/equipmentDetailScreen';
import PrivateRoute from './components/PrivateRoute';
import Profile from './screens/dashboard/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/dashboard' element={<EquipmentScreen />} />
        <Route path="/upload-image" element={<UploadImageScreen />} />
        <Route path="/equipments/:id" element={<EquipmentDetailScreen />} />
        <Route path="/add-equipment" element={<EquipmentDetailScreen />} />
        <Route path="/profile" element={<Profile />} /> 
      </Route>
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
