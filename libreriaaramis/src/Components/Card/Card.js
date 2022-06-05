import React from "react";
import s from './Card.module.css';
import itemIMG from '../../img/itemIMG.jpg';

const selector = Array.from(Array(50).keys());
selector.shift();

export default function Card(){

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                <img className={s.img} src={itemIMG} alt='item img'/>
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <div className={s.titleContainer}>
                        <h4 className={s.title}>Lapiceras 5 Colores Faber Castel</h4>
                    </div>
                    <select className={s.selector}>
                        {
                            selector.map((o,i)=>{
                                return <option value={o}>{o}</option>
                            })
                        }
                    </select>
                </div>
                <button className={s.btnCart}>Agregar al carrito</button>
            </div>
        </div>
    )
}