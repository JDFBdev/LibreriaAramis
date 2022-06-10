import React, { useState, useEffect } from "react";
import s from './Admin.module.css';
import AdminCard from "./AdminCard/AdminCard";
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Logo from '../../img/Aramis.png';
import Card from "../Card/Card";
import loading from '../../img/loading.gif';
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
    const [skeletonCards] = useState([1,2,3,4,5,6,7,8]);
    const [Modal, open] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalDelete, openDelete, closeDelete] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalLoading, openLoading, closeLoading] = useModal('root', { preventScroll: true, closeOnOverlayClick: false});

    useEffect(()=>{  // Obtengo data de productos
        window.scrollTo(0, 0);
        async function fetchData() {
            let promise = await axios.get(`https://aramis-backend.herokuapp.com/todosProductos`)
            let response = promise.data;
            setProducts(response);
        }
        fetchData();
    },[])

    const handleInput = function(e){  // Estado de inputs
        setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
    }

    const handleFile = function(e){  // Guardo la imagen en un estado y seteo el preview
        if(e.target.files[0]){
            setInput(prev=>({...prev, file: e.target.files[0]}));
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }

    }

    const handleSelectedFile = function(e){   // Guardo la imagen a modificar en un estado y seteo el preview
        if(e.target.files[0]){
            setSelected(prev=>({...prev, file: e.target.files[0]}));
            setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
        }

    }

    const handleCreate = function(e){  // Posteo la imagen a firebase, despues se activa el useffect de abajo
        e.preventDefault();
        openLoading();

        if (input.file === '') return;
        const imageRef = ref(storage, `images/${input.file.name}`);
        uploadBytes(imageRef, input.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setUrl(url);
        });
        });
    }

    useEffect(()=>{  // Si se guardo la imagen de firebase, vamos a handleSubmit
        if ( url && url !== '' ) hanldeSubmit();
    },[url])

    const hanldeSubmit = async function(){  // Posteamos el producto

        let promise = await axios.post(`https://aramis-backend.herokuapp.com/crearProducto`,{
            nombre: input.title,
            imagen: url,
            categoria: input.category
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al registrar el producto');
            console.log(response.err);
            
        }
        else{
            closeLoading();
            toast.success('Producto registrado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        
    }

    const handleMofidicar = async function(e){  // Si no hay imagen que modificar, posteamos el cambio, si hay, la subimos a firebase
        e.preventDefault();
        openLoading();

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

    useEffect(()=>{  // Si se subio la imagen a modificar a firebase, vamos al submit
        if ( modifyUrl && modifyUrl !== '' ) hanldeSubmitModificar(true);
    },[modifyUrl])

    const hanldeSubmitModificar = async function(image){  // Posteamos el cambio, con imagen anterior o con imagen nueva

        let promise = await axios.post(`https://aramis-backend.herokuapp.com/editarProducto`,{
            nombre: selected.nombre,
            imagen: image ? modifyUrl : selected.imagen,
            categoria: selected.categoria,
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al modificar el producto');
            console.log(response.err);
        }
        else{
            closeLoading();
            toast.success('Producto modificado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleDelete = async function(e){  // Borramos el producto
        e.preventDefault();
        openLoading();
        let promise = await axios.post(`https://aramis-backend.herokuapp.com/borrarProducto`,{
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al eliminar el producto');
            console.log(response.err);
        }
        else{
            closeLoading();
            toast.success('Producto eliminado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return(
        <div className={s.container}>
            <img className={s.aramisLogo} src={Logo} alt='Aramis Logo'/>
            <h1 className={s.moduleTitle}>Crear Producto</h1>
            <div className={s.create}>
                <form className={s.form} onSubmit={handleCreate}>
                    <input className={s.input} id='title' type='text' placeholder="Titulo..." onChange={handleInput}/>
                    <select className={s.input} id='category' onChange={handleInput}>
                        <option value='default'>Seleccionar Categoria</option>
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
                        <button className={s.btnSubmitError} type='button' onClick={()=>{}}>Crear Producto</button>
                    }
                </form>
                <Card product={{nombre: input.title, imagen: imagePreview}} disableCart={true}/>
            </div>
            {/* <div className={s.browser}>
                <form className={s.search}>
                    <input className={s.input} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer}>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
            </div> */}
            <h1 className={s.moduleTitle}>Todos los Productos</h1>
            <div className={s.cards}>
                {
                    products[0] ?
                    products?.map((p, i)=>{
                        return <Transition key={p.id} timeout={i*50}><AdminCard product={p} open={open} setSelected={setSelected} setSelectedImagePreview={setSelectedImagePreview}/></Transition>
                    }) : 
                    skeletonCards.map((p, i)=>{
                        return <Transition key={i} timeout={i*50}>
                        <div className={s.skeletonCard} >
                            <div className={s.skeletonImg}/>
                            <div className={s.skeletonTitle}/>
                        </div></Transition>
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
                            
                            <button className={s.btnDelete} onClick={(e)=>{e.preventDefault(); openDelete();}}>Eliminar Producto</button>
                            <button className={s.btnSubmit} type='submit' onClick={handleMofidicar}>Modificar Producto</button>
                        </form>
                        <Card product={{...selected, imagen: selectedImagePreview ? selectedImagePreview : selected.imagen}} disableCart={true}/>
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
            <ModalLoading>
                <Transition>
                    <div className={s.loadingDiv}>
                        <img className={s.loadingGif} src={loading} alt='Loading gif' />
                    </div>
                </Transition>
            </ModalLoading>
        </div>
    )
}