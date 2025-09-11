import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import './i18n/i18n'; // Import i18n configuration
import { LanguageProvider } from './contexts/LanguageContext';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Industries from './pages/Industries/Industries';
import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-gray-50">
        <ScrollToTop />
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Product />} />
            <Route path='/industries' element={<Industries />} />
            <Route path='/contact' element={<Contact />} />
            {/* <Route path="/products" element={<Products />} /> */}
            {/* Add more routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;