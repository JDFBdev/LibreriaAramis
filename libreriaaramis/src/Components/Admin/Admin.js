import React, { useState, useEffect } from "react";
import s from './Admin.module.css';
import AdminCard from "./AdminCard/AdminCard";
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Logo from '../../img/Aramis.png';
import Card from "../Card/Card";
import Lupa from '../../img/lupa.png';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/Firebase";

export default function Admin(){
    const [input, setInput] = useState({title: '', category: '', file: ''})
    const [url, setUrl] = useState('')
    const [Modal, open] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalDelete, openDelete] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    const handleInput = function(e){
        setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
    }

    const handleFile = function(e){
        if(e.target.files[0]){
            setInput(prev=>({...prev, file: e.target.files[0]}))
        }
    }

    const handleCreate = function(e){
        e.preventDefault();
        if (input.file === '') return;
        const imageRef = ref(storage, `images/${input.file.name}`);
        uploadBytes(imageRef, input.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setUrl(url);
        });
        });
    }

    useEffect(()=>{
        if ( url && url !== '' ) hanldeSubmit();
    },[url])

    const hanldeSubmit = function(){
        console.log(input.title, input.category, url)
    }

    return(
        <div className={s.container}>
            <img className={s.aramisLogo} src={Logo} alt='Aramis Logo'/>
            <div className={s.create}>
                <form className={s.form} onSubmit={handleCreate}>
                    <input className={s.input} id='title' type='text' placeholder="Titulo..." onChange={handleInput}/>
                    <select className={s.input} id='category' onChange={handleInput}>
                        <option value='default'>Seleccionar</option>
                        <option value='Escritura'>Escritura</option>
                        <option value='Oficina'>Oficina</option>
                        <option value='Resmas'>Resmas</option>
                        <option value='Escolar'>Escolar</option>
                        <option value='Computacion'>Computacion</option>
                        <option value='Mochilas'>Mochilas</option>
                    </select>
                    <div className={s.fileWrapper}>
                        <input className={s.file} id='file' type='file' onChange={handleFile}/>
                    </div>
                    {
                        ((input.title && input.file && input.category && input.title !== '' && input.file !== '' && input.category !== '' && input.category !== 'default')) ?
                        <button className={s.btnSubmit} type='submit'>Crear Producto</button>:
                        <button className={s.btnSubmitError} onClick={()=>{}}>Crear Producto</button>
                    }
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