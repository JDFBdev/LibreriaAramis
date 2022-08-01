import React from "react";
import s from './Footer.module.css';
import instagram from '../../img/instagramGreen.png';
import wpp from '../../img/wppGreen.png';
import facebook from '../../img/facebook.png';
import aramis from '../../img/Aramiswhite.png'
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

export default function Footer(){
    const Navigate = useNavigate();

    const handleWasap = function(e){
        e.preventDefault();
        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día!&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491168803383&text=Buen día!`,'_blank');
    }

    return (
        <div className={s.container}>
            <img className={s.aramis} src={aramis} alt='Aramis Logo' onClick={()=>Navigate('/')}/>
            <p className={s.p}> 
                Lunes a Viernes de 7:15 a 13hs y de 15:30 a 19hs<br/>
                Sabados de 10 a 13hs
            </p>
            <div className={s.logos}>
                <div className={s.logoContainer} onClick={() => {window.open('https://www.instagram.com/libreriaaramis/','_blank')}}>
                    <img className={s.logo} src={instagram} alt='Instagram Logo' />
                </div> 
                <div className={s.logoContainer} onClick={handleWasap}>
                    <img className={s.logo} src={wpp} alt='Whatsapp Logo' />
                </div>
                <div className={s.logoContainer} onClick={() => {window.open('https://www.facebook.com/AramisLibreria','_blank')}}>
                    <img className={s.logo} src={facebook} alt='Facebook Logo' />
                </div>
            </div>
            <p className={s.p}>libreriaaramis@gmail.com</p>
        </div>
    )
}