import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './components/Search.tsx';
import Car from './components/Car.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/search/:id' element={<Search />} />
        <Route path='/car' element={<Car />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
