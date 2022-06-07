import React from "react";
import s from './AdminCard.module.css';
import itemIMG from '../../../img/itemIMG.jpg';

export default function AdminCard({open}){

    return(
        <div className={s.container} onClick={open}>
            <img className={s.img} src={itemIMG} alt='item img'/>
            <div className={s.titleContainer}>
                <p className={s.title}>Lapiceras 5 Colores Faber Castel</p>
            </div>
        </div>
    )
}