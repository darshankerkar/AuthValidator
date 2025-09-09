import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
      <Route path="/verify-certificate" element={<VerifyCertificate />} />
    </Routes>
  );
}

export default App;