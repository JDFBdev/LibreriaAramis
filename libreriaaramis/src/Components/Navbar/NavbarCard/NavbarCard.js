import React from "react";
import s from './NavbarCard.module.css';

export default function NavbarCard({product}){
    return (
        <div className={s.container}>
            <img className={s.image} src={product.imagen} alt='Product'/>
            <div className={s.titleContainer}>
                <p className={s.title}>{product.nombre}</p>
            </div>
        </div>
    )
}