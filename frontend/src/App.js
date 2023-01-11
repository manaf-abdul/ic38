// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CommonRoutes from './CommonRoutes';
// import SideBar from './Components/SideBar/SideBar';
// import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<CommonRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
