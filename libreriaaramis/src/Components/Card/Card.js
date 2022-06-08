import React from "react";
import s from './Card.module.css';

const selector = Array.from(Array(26).keys());
selector.shift();

export default function Card({product}){

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                {
                    product && product.imagen ?
                    <img className={s.img} src={product.imagen} alt='item img'/> :
                    null
                }
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <div className={s.titleContainer}>
                    {
                        product ? 
                        <h4 className={s.title}>{product.nombre}</h4>:
                        <h4 className={s.title}></h4>
                    }
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