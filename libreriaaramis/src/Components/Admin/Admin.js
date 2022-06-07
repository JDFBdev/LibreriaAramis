import React from "react";
import s from './Admin.module.css';
import AdminCard from "./AdminCard/AdminCard";
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Logo from '../../img/Aramis.png';
import Card from "../Card/Card";
import Lupa from '../../img/lupa.png'

export default function Admin(){
    const [Modal, open] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalDelete, openDelete] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    return(
        <div className={s.container}>
            <img className={s.aramisLogo} src={Logo} alt='Aramis Logo'/>
            <div className={s.create}>
                <form className={s.form}>
                    <input className={s.input} type='text' placeholder="Titulo..."/>
                    <select className={s.input}>
                        <option value='Escritura'>Escritura</option>
                        <option value='Oficina'>Oficina</option>
                        <option value='Resmas'>Resmas</option>
                        <option value='Escolar'>Escolar</option>
                        <option value='Computacion'>Computacion</option>
                        <option value='Mochilas'>Mochilas</option>
                    </select>
                    <div className={s.fileWrapper}>
                        <input className={s.file} type='file'/>
                    </div>
                    <button className={s.btnSubmit} type='submit'>Crear Producto</button>
                </form>
                <Card/>
            </div>
            <div className={s.browser}>
                <form className={s.search}>
                    <input className={s.input} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer}>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
            </div>
            <div className={s.cards}>
                <AdminCard open={open}/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
                <AdminCard/>
            </div>
            <Modal>
                <Transition>
                    <div className={s.create}>
                        <form className={s.formModal}>
                            <h3 className={s.modalTitle}>Modificar Producto</h3>
                            <input className={s.input} type='text' placeholder="Titulo..."/>
                            <select className={s.input}>
                                <option value='Escritura'>Escritura</option>
                                <option value='Oficina'>Oficina</option>
                                <option value='Resmas'>Resmas</option>
                                <option value='Escolar'>Escolar</option>
                                <option value='Computacion'>Computacion</option>
                                <option value='Mochilas'>Mochilas</option>
                            </select>
                            <div className={s.fileWrapper}>
                                <input className={s.file} type='file'/>
                            </div>
                            <button className={s.btnDelete} type='submit' onClick={(e)=>{e.preventDefault(); openDelete();}}>Eliminar Producto</button>
                            <button className={s.btnSubmit} type='submit'>Modificar Producto</button>
                        </form>
                        <Card/>
                    </div>
                </Transition>
            </Modal>
            <ModalDelete>
                <Transition>
                    <div className={s.modalDelete}>
                        <h3 className={s.modalTitle}>Esta seguro que desea<br/>eliminar el producto?</h3>
                        <button className={s.btnCancel} type='submit'>Cancelar</button>
                        <button className={s.btnDelete} type='submit'>Eliminar Producto</button>
                    </div>
                </Transition>
            </ModalDelete>
        </div>
    )
}