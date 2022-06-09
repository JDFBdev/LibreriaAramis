import React, { useState, useEffect } from "react";
import s from './Cart.module.css';
import Wpp from '../../img/wpp.png';
import CartCard from "./CartCard/CartCard";
import {isMobile} from 'react-device-detect';

export default function Cart(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        let productsCart = [];

        if (localStorage.getItem('order')) {
          productsCart = localStorage.getItem('order');
          productsCart = JSON.parse(productsCart);
          setProducts(productsCart);
        }

    },[])

    const deleteItem = function(id){
        let productsCart = [];
        productsCart = localStorage.getItem('order');
        productsCart = JSON.parse(productsCart);
        productsCart = productsCart.filter((product) => product.id !== id);
        setProducts(productsCart);
        localStorage.setItem('order', JSON.stringify(productsCart))
    }

    const handleWasap = function(e){
        e.preventDefault();

        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491168803383&text=Buen día! Quisiera pedir presupuesto para el sigueinte pedido:%0a${
            products.map((p)=>{
            return `• ${p.nombre}, ${p.cant} unidades.%0a`
        }).join('')}&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491168803383&text=Buen día! Quisiera pedir presupuesto para el sigueinte pedido:%0a${
            products.map((p)=>{
            return `• ${p.nombre}, ${p.cant} ${p.cant === 1 ? 'unidad' : 'unidades'}.%0a`
        }).join('')}&app_absent=0`,'_blank');

    }

    return(
        <div className={s.container}>
            <div className={s.header}>
                <h3 className={s.title}>Carrito</h3>
                {
                    products.length === 0 && <p className={s.subTitle}>No hay productos</p>
                }
                {
                    products.length === 1 && <p className={s.subTitle}>1 Producto</p>
                }
                {
                    products.length > 1 && <p className={s.subTitle}>{products.length} Productos</p>
                }
            </div>
            <div className={s.cards}>
                {
                    products?.map((p,i)=>{
                        return <CartCard key={i} product={p} deleteItem={deleteItem}/>
                    })
                }
            </div>
            {
                products.length === 0 ? 
                    <div className={s.btnSubmitError}>
                    <p className={s.btnText}>Pedir Presupuesto</p>
                    <img src={Wpp} alt='wpp logo' className={s.wppLogo}></img>
                </div>:
                    <div className={s.btnSubmit} onClick={handleWasap}>
                    <p className={s.btnText}>Pedir Presupuesto</p>
                    <img src={Wpp} alt='wpp logo' className={s.wppLogo}></img>
                </div>
            }

        </div>
    )
}