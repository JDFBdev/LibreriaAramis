import React from "react";
import s from './NotFound.module.css';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useModal } from "react-hooks-use-modal";
import Transition from "../Transition/Transition";
import Cart from "../Cart/Cart";

export default function NotFound(){
    const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    const Navigate = useNavigate();

    return(
        <div className={s.container}>
            <Navbar open={open}/>
            <div className={s.content}>
                <h1 className={s.title}>El contenido que estas buscando<br/>no esta disponible.</h1>
                <button className={s.btn} onClick={()=>{Navigate('/')}}>Volver al inicio</button>
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