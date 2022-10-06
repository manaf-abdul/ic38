// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CommonRoutes from './CommonRoutes';
// import SideBar from './Components/SideBar/SideBar';
// import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Router>
        <Routes>
          <Route path='/*' element={<CommonRoutes />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
