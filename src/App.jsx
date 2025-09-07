import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
// import Login from '../pages/Login';
// import Dashboard from '../pages/Dashboard';

function App() {
  return (
    <>
        <Routes>
          <Route path='/AuthValidator' element={<Welcome />} />
        </Routes>
    </>
  );
}

export default App;