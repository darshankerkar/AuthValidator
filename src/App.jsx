import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import VerifyCertificate from './pages/VerifyCertificate';
import InstitutionPortal from './pages/InstitutionPortal';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/verify-certificate' element={<VerifyCertificate />} />
      <Route path='/admin-dashboard' element={<Dashboard />} />
  <Route path='/institution-portal' element={<InstitutionPortal />} />
    </Routes>
  );
}

export default App;