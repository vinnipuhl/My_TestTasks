import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import CurrencyConverter from './pages/CurrencyConverter'
import './App.css';

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path='/CurrencyConverter' element={<CurrencyConverter/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
  )
}