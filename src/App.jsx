import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './coponents/Navbar';
import NotFound from './pages/NotFound';
import Downloads from './pages/Downloads';
import Blog from './pages/Blog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route index element={<HomePage />}/>
          <Route path='/downloads' element={<Downloads/>} />
          <Route path='/blog' element={<Blog/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
