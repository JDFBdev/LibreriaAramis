import React, { useState } from "react";
import s from './Card.module.css';
import toast from 'react-hot-toast';

const selector = Array.from(Array(26).keys());
selector.shift();

export default function Card({product, disableCart}){
    const [amount, setAmount] = useState(1)

    const handleCarrito = function(){

        console.log(disableCart)

        if (!disableCart){
            let productsCart = [];

            if (localStorage.getItem('order')) {            // Si hay algo en el localStorage
                productsCart = localStorage.getItem('order');  // Lo traigo
                productsCart = JSON.parse(productsCart);       // Y lo convierto a JSON

                if (productsCart.filter((e) => e.id === product.id).length > 0){  // Si este producto ya existe en el carrito
                    productsCart.forEach((p,i)=>{
                    if (p.id === product.id){
                        p.cant = Number(p.cant) + Number(amount);          // Le sumo los amounts de esta card
                    }
                })
                } else {                                   //  Si no no existe en el carrito
                    productsCart.push({...product, cant: amount});  //  Lo pusheo
                }

            localStorage.setItem('order', JSON.stringify(productsCart))   // Y subo al localStorage

            } else {                                           // Si no hay nada en el localStorage
            productsCart.push({...product, cant: amount});    //  Lo pusheo
            localStorage.setItem('order', JSON.stringify(productsCart))   // Y subo al localStorage
            }
            toast.success('Producto Agregado al carrito');

        }
    }

    const handleSelect = function(e){
        setAmount(e.target.value)
    }

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                {
                    product && product.imagen ?
                    <img className={s.img} src={product.imagen} alt={product.nombre}/> :
                    null
                }
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <div className={s.titleContainer}>
                    {
                        product ? 
                        <h4 className={s.title}>{product.nombre}</h4>:
                        <h4 className={s.title}> </h4>
                    }
                    </div>
                    <select className={s.selector} onChange={handleSelect}>
                        {
                            selector.map((o,i)=>{
                                return <option value={o} key={o} >{o}</option>
                            })
                        }
                    </select>
                </div>
                <button className={s.btnCart} onClick={handleCarrito}>Agregar al carrito</button>
            </div>
        </div>
    )
}