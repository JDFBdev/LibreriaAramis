import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Navbar from '../Navbar/Navbar';
import SwiperMain from '../SwiperMain/SwiperMain';
import SwiperProducts from '../SwiperProducts/SwiperProducts';
import escritura from '../../img/escritura.jpg';
import oficina from '../../img/oficina.jpg';
import resmas from '../../img/resmas.jpg';
import escolar from '../../img/escolar.jpg';
import computacion from '../../img/computacion.jpg';
import mochilas from '../../img/mochilas.jpg';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import axios from 'axios';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
  const Navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo(0, 0);
    async function fetchData() {
        let promise = await axios.get(`https://aramis-backend.herokuapp.com/todosProductos`)
        let response = promise.data;
        setProducts(response);
    }
    fetchData();
},[])

  return (
    <div style={{backgroundColor: '#F4F5F6'}}>
      <Navbar open={open}/>
      <div className={s.content}>
        <SwiperMain/>
        <div className={s.categories}>
          <div className={s.category} onClick={()=>Navigate('/Search/Escritura')} >
            <img className={s.categoryIMG} src={escritura} alt='Escritura'/>
            <div className={s.categoryLabel}>Escritura</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search/Oficina')}>
            <img className={s.categoryIMG} src={oficina} alt='Oficina'/>
            <div className={s.categoryLabel}>Oficina</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search/Resmas')}>
            <img className={s.categoryIMG} src={resmas} alt='Resmas'/>
            <div className={s.categoryLabel}>Resmas</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search/Escolar')} >
            <img className={s.categoryIMG} src={escolar} alt='Escolar'/>
            <div className={s.categoryLabel}>Escolar</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search/computacion')}>
            <img className={s.categoryIMG} src={computacion} alt='computacion'/>
            <div className={s.categoryLabel}>Computación</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search/mochilas')}>
            <img className={s.categoryIMG} src={mochilas} alt='mochilas'/>
            <div className={s.categoryLabel}>Mochilas</div>
          </div>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Nuestros Productos Mas Vendidos</h2>
          <SwiperProducts products={products}/>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Drysdale 5675, Carapachay, Vicente López, Buenos Aires</h2>
          <iframe title='Maps' src={`https://maps.google.com/maps?q=-34.527348126436884,-58.53490686416626&output=svembed`} className={s.iframe} allowFullScreen></iframe>
        </div>
        <Footer/>
      </div>
      <Modal>
        <Transition>
          <Cart/>
        </Transition>
      </Modal>
    </div>
  );
}