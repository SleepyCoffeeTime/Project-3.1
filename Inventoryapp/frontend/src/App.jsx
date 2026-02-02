import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MyItemPage from './components/MyItemPage';
import ItemsPage from './components/ItemsPage';
import ItemDetails from './components/ItemDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<MyItemPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}

export default App;