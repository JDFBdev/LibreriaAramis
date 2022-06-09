import React, { useState, useEffect } from "react";
import s from './Search.module.css';
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';

export default function Search(){
    const [products, setProducts] = useState([]);
    const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    const skeletonCards = [0,1,2,3,4,5,6,7,8,9];

    useEffect(()=>{
        window.scrollTo(0, 0);
        async function fetchData() {
            let promise = await axios.get(`https://aramis-backend.herokuapp.com/todosProductos`)
            let response = promise.data;
            setProducts(response);
        }
        fetchData();
    },[])

    return(
        <div className={s.container}>
            <Navbar open={open}/>
            <div className={s.content}>
                <h2 className={s.title}>Resultados para Lapiceras</h2>
                <div className={s.data}>
                    <div className={s.filters}>
                        <select className={s.selector}>
                            <option value='default'>Ordenar Por</option>
                            <option value="AZ">A-Z</option>
                            <option value="ZA">Z-A</option>
                            <option value="MAYOR">Mayor Precio</option>
                            <option value="MENOR">Menor Precio</option>  
                        </select>
                    </div>
                    <div className={s.cards}>
                        {
                            products[0] ? 
                            products?.map((p)=>{
                                return <Card key={p.id} product={p} />
                            }) :
                            skeletonCards.map((p, i)=>{
                                return (
                                     <Transition key={i} timeout={i*50} >
                                        <div  className={s.skeletonCard} >
                                            <div className={s.skeletonImg}/>
                                            <div className={s.skeletonTitle}/>
                                            <div className={s.skeletonTitle2}/>
                                        </div>
                                    </Transition>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer/>
            <Modal>
                <Transition>
                    <Cart/>
                </Transition>
            </Modal>
        </div>
    )
}