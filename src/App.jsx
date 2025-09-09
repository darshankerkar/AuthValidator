import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/AuthValidator/" replace />} />
      <Route path="/AuthValidator/" element={<Welcome />} />
      <Route path="/AuthValidator/login" element={<Login />} />
      <Route path="/AuthValidator/signup" element={<SignUp />} />
      <Route path="/AuthValidator/verify" element={<VerifyCertificate />} />
    </Routes>
  );
}

export default App;