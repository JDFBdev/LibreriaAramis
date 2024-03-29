import React, { useState, useEffect } from "react";
import s from './Search.module.css';
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination/Pagination';

export default function Search(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    const skeletonCards = [0,1,2,3,4,5,6,7,8,9];
    let { param } = useParams();
    let currentPosts = []

    useEffect(()=>{
        window.scrollTo(0, 0);
        async function fetchData() {
            setLoading(true);
            let promise = await axios.get(`https://aramis-backend.onrender.com/buscador/${param}`)
            let response = promise.data; 
            setProducts(response);
            setLoading(false);
        }
        fetchData();
    },[])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if(products){
        if(products[0]){
        currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
        }
    }
    
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>setLoading(false), 500);
    },[currentPage]);

    return(
        <div className={s.container}>
            <Navbar open={open}/>
            <div className={s.content}>
            {
                    !loading ? 
                    products[0] ? 
                    <h2 className={s.title}>Resultados para {param}</h2>:
                    <h2 className={s.title}>No hay resultados para {param}</h2> :
                    <h2 className={s.title}>Buscando...</h2>
                }
                <div className={s.data}>
                    <div className={s.cards}>
                        {
                            products && !loading ? 
                            currentPosts?.map((p)=>{
                                return <Card key={p.id} product={p} responsive={true} />
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
                    <div className={s.pagination}>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={products?.length}
                            paginate={paginate}
                        />
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