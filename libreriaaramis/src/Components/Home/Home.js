import React from 'react';
import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';
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

export default function Home() {
  const Navigate = useNavigate();

  return (
    <div style={{backgroundColor: '#F4F5F6'}}>
      <Navbar/>
      <div className={s.content}>
        <SwiperMain/>
        <div className={s.categories}>
          <div className={s.category} onClick={()=>Navigate('/Search')} >
            <img className={s.categoryIMG} src={escritura} alt='Escritura'/>
            <div className={s.categoryLabel}>Escritura</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search')}>
            <img className={s.categoryIMG} src={oficina} alt='Oficina'/>
            <div className={s.categoryLabel}>Oficina</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search')}>
            <img className={s.categoryIMG} src={resmas} alt='Resmas'/>
            <div className={s.categoryLabel}>Resmas</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search')} >
            <img className={s.categoryIMG} src={escolar} alt='Escritura'/>
            <div className={s.categoryLabel}>Escolar</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search')}>
            <img className={s.categoryIMG} src={computacion} alt='Oficina'/>
            <div className={s.categoryLabel}>Computacion</div>
          </div>
          <div className={s.category} onClick={()=>Navigate('/Search')}>
            <img className={s.categoryIMG} src={mochilas } alt='Resmas'/>
            <div className={s.categoryLabel}>Mochilas</div>
          </div>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Nuestros Productos Mas Vendidos</h2>
          <SwiperProducts/>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Av. Maipú 825, Vicente López, Buenos Aires</h2>
          <iframe title='Maps' src="https://maps.google.com/maps?q=-34.527348126436884,-58.53490686416626&output=svembed" className={s.iframe} allowFullScreen></iframe>
        </div>
        <Footer/>
      </div>
    </div>
  );
}