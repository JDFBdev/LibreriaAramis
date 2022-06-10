import React from 'react';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Admin from './Components/Admin/Admin';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Search/:param" element={<Search />}/>
          <Route path="/kYWQ8vVKstxY8C2n" element={<Admin />}/>
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
