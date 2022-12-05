import React from 'react';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NotFound from './Components/NotFound/NotFound';
import Mantenimiento from './Components/Mantenimiento/Mantenimiento';

function App() {
  return (
    <>
      <Toaster/>
      <Mantenimiento/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Search/:param" element={<Search />}/>
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter> */}
      </>
  );
}

export default App;
