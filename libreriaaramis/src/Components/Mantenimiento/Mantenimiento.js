import React from 'react';
import s from "./Mantenimiento.module.css";
import logo from "../../img/Aramiswhite.png";
import mantenience from '../../img/mantenience.gif';
import wpp from "../../img/wppGreen.png";
import insta from "../../img/instagramGreen.png";
import { isMobile } from 'react-device-detect';

export default function Mantenimiento() {

    const handleWasap = function(e){
        e.preventDefault();
        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día!&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491168803383&text=Buen día!`,'_blank');
    }

    return (
        <div className={s.container}>
            <div className={s.content}>
                <div className={s.header}>
                    <img alt="Aramis" src={logo} className={s.aramisLogo} />
                </div>
                <div className={s.info}>
                    <h3 className={s.title}>Web en mantenimiento.</h3>
                    <img src={mantenience} className={s.mantenience} alt="Mantenimiento"/>
                    <div className={s.redes}>
                        <img alt="Wasap" src={wpp} className={s.wpp} onClick={handleWasap}/>
                        <img alt="Insta" src={insta} className={s.wpp} onClick={() => {window.open('https://www.instagram.com/libreriaaramis/','_blank')}}/>
                    </div>
                </div>
            </div>
        </div>
  )
}
