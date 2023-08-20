import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/penjualan/Home';
import Sukses from './pages/penjualan/Sukses';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/penjualan' element={<Home/>}/>
        <Route path='/sukses' element={<Sukses/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
