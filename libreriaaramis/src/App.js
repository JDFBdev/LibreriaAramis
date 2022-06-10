import React from 'react';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Admin from './Components/Admin/Admin';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/kYWQ8vVKstxY8C2n" element={<Home />}/>
          <Route path="/Search" element={<Search />}/>
          <Route path="/" element={<Admin />}/>
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
