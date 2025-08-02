import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Documents from './pages/Documents';
import Authorities from './pages/Authorities';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/news" element={<Layout><News /></Layout>} />
      <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
      <Route path="/documents" element={<Layout><Documents /></Layout>} />
      <Route path="/authorities" element={<Layout><Authorities /></Layout>} />
    </Routes>
  );
}

export default App;