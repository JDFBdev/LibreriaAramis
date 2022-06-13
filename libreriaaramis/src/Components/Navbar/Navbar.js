import React, { useState } from 'react';
import s from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Aramis.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import Lupa from '../../img/lupa.png';
import { isMobile } from 'react-device-detect';
import NavbarCard from './NavbarCard/NavbarCard';

export default function Navbar({open, products}) {
    const [input, setInput] = useState('');
    // const [products, setProucts] = useState([]);
    const Navigate = useNavigate();
  
    const handleInput = function(e){
        setInput(e.target.value)
    }

    const handleWasap = function(e){
        e.preventDefault();
        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día!&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491168803383&text=Buen día!`,'_blank');
    }

  return (
    <div className={s.container}>
        <img className={s.aramisLogo} src={Logo} alt='Aramis Logo' onClick={()=> Navigate('/')}/>
        <div className={s.content}>
            <div className={s.search}>
                <form className={s.form} onSubmit={()=> Navigate(`/Search/${input}`)}>
                    <input className={s.input} onChange={handleInput} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer} onClick={()=> Navigate(`/Search/${input}`)} type='submit'>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
                {
                    input.length > 2 && 
                    <div className={s.browser} style={{marginTop: `${products.length*80 + 30 - (products.length >= 4 ? products.length *14 : 0)}px`}}>
                        {
                            products ? 
                            products?.map((p)=>{
                                return <NavbarCard product={p} key={p.id}/>
                            }) : 
                            <NavbarCard />
                        }
                    </div>
                }
            </div>
            <div className={s.logos}>
                <div className={s.logoContainer} onClick={() => {window.open('https://www.instagram.com/libreriaaramis/','_blank')}}>
                    <img className={s.logo} src={Insta} alt='Instagram Logo'/>
                </div> 
                <div className={s.logoContainer} onClick={handleWasap}>
                    <img className={s.logo} src={Wpp} alt='Whatsapp Logo' />
                </div>
                <div className={s.logoContainer} onClick={open}>
                    <img className={s.logo} src={Cart} alt='Cart Logo' />
                </div>
            </div>
        </div>
    </div>
  );
}