// App.js
import { BrowserRouter,Routes, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />}/>
      </Routes>
      </BrowserRouter>
      </div>
    
  );
}
