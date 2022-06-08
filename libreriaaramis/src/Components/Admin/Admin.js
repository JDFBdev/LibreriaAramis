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
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Admin(){
    const [input, setInput] = useState({title: '', category: '', file: ''})
    const [url, setUrl] = useState('');
    const [modifyUrl, setModifyUrl] = useState('');
    const [selected, setSelected] = useState({nombre: '', categoria: '', imagen: '', id: -1, file:''});
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [Modal, open] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalDelete, openDelete, closeDelete] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{
        async function fetchData() {
            let promise = await axios.get(`http://localhost:3001/todosProductos`)
            let response = promise.data;
            setProducts(response);
        }
        fetchData();
    },[])

    const handleInput = function(e){
        setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
    }

    const handleFile = function(e){
        if(e.target.files[0]){
            setInput(prev=>({...prev, file: e.target.files[0]}));
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }

    }

    const handleSelectedFile = function(e){
        if(e.target.files[0]){
            setSelected(prev=>({...prev, file: e.target.files[0]}));
            setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
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
        console.log('creando')
    }

    useEffect(()=>{
        if ( url && url !== '' ) hanldeSubmit();
    },[url])

    useEffect(()=>{
        if ( modifyUrl && modifyUrl !== '' ) hanldeSubmitModificar(true);
    },[modifyUrl])

    const hanldeSubmit = async function(){

        let promise = await axios.post(`http://localhost:3001/crearProducto`,{
            nombre: input.title,
            imagen: url,
            categoria: input.category
        })
        let response = promise.data;
        if (!response.success){
            toast.error('Error al registrar el producto');
            console.log(response.err);
        }
        else{
            toast.success('Producto registrado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        
    }

    const handleMofidicar = async function(e){
        e.preventDefault();
        if(selected.file === ''){
            hanldeSubmitModificar(false);
        }else{
            const imageRef = ref(storage, `images/${selected.file.name}`);
            uploadBytes(imageRef, selected.file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setModifyUrl(url);
            });
            });
        }
    }

    const hanldeSubmitModificar = async function(image){

        let promise = await axios.post(`http://localhost:3001/editarProducto`,{
            nombre: selected.nombre,
            imagen: image ? modifyUrl : selected.imagen,
            categoria: selected.categoria,
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            toast.error('Error al modificar el producto');
            console.log(response.err);
        }
        else{
            toast.success('Producto modificado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleDelete = async function(e){
        e.preventDefault();
        let promise = await axios.post(`http://localhost:3001/borrarProducto`,{
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            toast.error('Error al eliminar el producto');
            console.log(response.err);
        }
        else{
            toast.success('Producto eliminado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
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
                <Card product={{nombre: input.title, imagen: imagePreview}}/>
            </div>
            {/* <div className={s.browser}>
                <form className={s.search}>
                    <input className={s.input} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer}>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
            </div> */}
            <div className={s.cards}>
                {
                    products?.map((p)=>{
                        return <AdminCard product={p} open={open} setSelected={setSelected} setSelectedImagePreview={setSelectedImagePreview}/>
                    })
                }
            </div>
            <Modal>
                <Transition>
                    <div className={s.create}>
                        <form className={s.formModal}>
                            <h3 className={s.modalTitle}>Modificar Producto</h3>
                            <input className={s.input} value={selected.nombre} type='text' placeholder="Titulo..." onChange={(e)=>setSelected((prev)=>({...prev, nombre: e.target.value}))}/>
                            <select className={s.input} value={selected.categoria} onChange={(e)=>setSelected((prev)=>({...prev, categoria: e.target.value}))}>
                                <option value='Escritura'>Escritura</option>
                                <option value='Oficina'>Oficina</option>
                                <option value='Resmas'>Resmas</option>
                                <option value='Escolar'>Escolar</option>
                                <option value='Computacion'>Computacion</option>
                                <option value='Mochilas'>Mochilas</option>
                            </select>
                            <div className={s.fileWrapper}>
                                <input className={s.file} type='file' id='file' onChange={handleSelectedFile} />
                            </div>
                            <button className={s.btnDelete} type='submit' onClick={(e)=>{e.preventDefault(); openDelete();}}>Eliminar Producto</button>
                            <button className={s.btnSubmit} type='submit' onClick={handleMofidicar}>Modificar Producto</button>
                        </form>
                        <Card product={{...selected, imagen: selectedImagePreview ? selectedImagePreview : selected.imagen}}/>
                    </div>
                </Transition>
            </Modal>
            <ModalDelete>
                <Transition>
                    <div className={s.modalDelete}>
                        <h3 className={s.modalTitle}>Esta seguro que desea<br/>eliminar el producto?</h3>
                        <button className={s.btnCancel} type='submit' onClick={(e)=> {e.preventDefault(); closeDelete();}}>Cancelar</button>
                        <button className={s.btnDelete} type='submit' onClick={handleDelete}>Eliminar Producto</button>
                    </div>
                </Transition>
            </ModalDelete>
        </div>
    )
}