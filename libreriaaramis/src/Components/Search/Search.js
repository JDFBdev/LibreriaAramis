import React from "react";
import s from './Search.module.css';
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';


export default function Search(){
    const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});

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
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
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