import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { Routes, Route } from 'react-router-dom'
import { useThemeStore } from './store/useThemeStore.js'


function App () {
  const {theme} = useThemeStore();

  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        {/* Add more routes as needed */}
      </Routes>
      
    </div>
  );
}

export default App
