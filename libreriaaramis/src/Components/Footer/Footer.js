import React from "react";
import s from './Footer.module.css';
import instagram from '../../img/instagramGreen.png';
import wpp from '../../img/wppGreen.png';
import facebook from '../../img/facebook.png';
import aramis from '../../img/Aramiswhite.png'

export default function Footer(){

    return (
        <div className={s.container}>
            <img className={s.petit} src={aramis} alt='Petit Boutique Logo'/>
            <p className={s.p}> 
                Lunes a Viernes 10 - 19hs<br/>
                Sabados 10:30 - 14:30hs
            </p>
            <div className={s.logos}>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={instagram} alt='Instagram Logo' onClick={() => {window.open('https://www.instagram.com/libreriaaramis/','_blank')}}/>
                </div> 
                <div className={s.logoContainer}>
                    <img className={s.logo} src={wpp} alt='Whatsapp Logo' onClick={() => {window.open('https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día!&app_absent=0','_blank')}}/>
                </div>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={facebook} alt='Facebook Logo' onClick={() => {window.open('https://www.facebook.com/AramisLibreria','_blank')}}/>
                </div>
            </div>
            <p className={s.p}>libreriaaramis@gmail.com</p>
        </div>
    )
}