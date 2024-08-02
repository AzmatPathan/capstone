import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import EquipmentDetailScreen from './screens/dashboard/equipmentDetailScreen';
import EquipmentReviewScreen from './screens/dashboard/equipmentReviewScreen';
import EquipmentScreen from './screens/dashboard/equipmentScreen';
import Profile from './screens/dashboard/Profile';
import ReviewDetailScreen from './screens/dashboard/reviewDetailScreen';
import UploadImageScreen from './screens/dashboard/uploadImageScreen';
import UserScreen from './screens/dashboard/userScreen';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import store from './store';
import UploadsScreen from './screens/dashboard/uploadScreen';
import HealthCheck from './HealthCheck'; // Import the HealthCheck component

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
        <Route path="/reviews" element={<EquipmentReviewScreen />} />
        <Route path="/reviews/:id" element={<ReviewDetailScreen />} />
        <Route path="/upload-image" element={<UploadImageScreen />} />
        <Route path="/equipments/:id" element={<EquipmentDetailScreen />} />
        <Route path="/add-equipment" element={<EquipmentDetailScreen />} />
        <Route path="/uploads" element={<UploadsScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<UserScreen />} />
      </Route>
      <Route path='/health' element={<HealthCheck />} /> {/* Add the health check route */}
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
