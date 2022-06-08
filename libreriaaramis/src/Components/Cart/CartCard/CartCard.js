import React from "react";
import s from './CartCard.module.css';
import itemIMG from '../../../img/itemIMG.jpg';

export default function CartCard(){

    return(
        <div className={s.container}>
            <img className={s.img} src={itemIMG} alt='item img'/>
            <div className={s.data}>
                <div className={s.titleContainer}>
                    <p className={s.title}>Lapiceras 5 Colores Faber Castel</p>
                </div>
                <div className={s.bottom}>
                    <p className={s.p}>x2</p>
                    <button className={s.btnDelete}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}