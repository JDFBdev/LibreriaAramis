import React from "react";
import s from './Cart.module.css';
import Wpp from '../../img/wpp.png';
import CartCard from "./CartCard/CartCard";

export default function Cart(){
    return(
        <div className={s.container}>
            <div className={s.header}>
                <h3 className={s.title}>Carrito</h3>
                <p className={s.subTitle}>4 Productos</p>
            </div>
            <div className={s.cards}>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
            </div>
            <div className={s.btnSubmit}>
                <p className={s.btnText}>Pedir Presupuesto</p>
                <img src={Wpp} alt='wpp logo' className={s.wppLogo}></img>
            </div>
        </div>
    )
}