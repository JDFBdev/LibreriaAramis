import React from "react";
import s from './CartCard.module.css';

export default function CartCard({product, deleteItem}){

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                <img className={s.img} src={product.imagen} alt='item img'/>
            </div>
            <div className={s.data}>
                <div className={s.titleContainer}>
                    <p className={s.title}>{product.nombre}</p>
                </div>
                <div className={s.bottom}>
                    <p className={s.p}>x{product.cant}</p>
                    <button className={s.btnDelete} onClick={()=>{deleteItem(product.id)}}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}