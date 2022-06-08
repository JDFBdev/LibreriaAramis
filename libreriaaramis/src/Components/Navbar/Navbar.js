import React from 'react';
import s from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Aramis.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import Lupa from '../../img/lupa.png';

export default function Navbar({open}) {

  const Navigate = useNavigate();

  return (
    <div className={s.container}>
        <img className={s.aramisLogo} src={Logo} alt='Aramis Logo' onClick={()=> Navigate('/')}/>
        <div className={s.content}>
            <div className={s.search}>
                <form className={s.form}>
                    <input className={s.input} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer} onClick={()=> Navigate('/Search')}>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
            </div>
            <div className={s.logos}>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={Insta} alt='Instagram Logo' onClick={() => {window.open('https://www.instagram.com/libreriaaramis/','_blank')}}/>
                </div> 
                <div className={s.logoContainer}>
                    <img className={s.logo} src={Wpp} alt='Whatsapp Logo' onClick={() => {window.open('https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día!&app_absent=0','_blank')}}/>
                </div>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={Cart} alt='Cart Logo' onClick={open}/>
                </div>
            </div>
        </div>
    </div>
  );
}