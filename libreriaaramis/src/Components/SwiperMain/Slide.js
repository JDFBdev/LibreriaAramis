import React from "react";
import s from './Slide.module.css'
import green from '../../img/slideGreen.png';
import purple from '../../img/slidePurple.png';
import blue from '../../img/slideBlue.png';
import img1 from '../../img/slideIMG1.jpg';
import img2 from '../../img/slideIMG2.jpg';
import img3 from '../../img/slideIMG4.jpg';

const data = [{
    title: 'Visita nuestro local!',
    text: 'Escolar - Comercial - Computación - Artística - Resmas - Mochilas. Lunes a Viernes 10 - 19hs Sabados 10:30 - 14:30hs',
    div: green,
    img: img1
},
{
    title: 'Todo para tu oficina',
    text: 'Pedinos tu presupuesto agregandolo al carrito. También consultanos por productos que no figuran en la lista.',
    div: purple,
    img: img2
},
{
    title: 'Centro de copiado',
    text: 'Fotocpias A4/A3, impresiones laser a color, anilados, fotocopiados y mas.',
    div: blue,
    img: img3
}

]


export default function Slide({selector}) {

    return(
        <div className={s.container}>
            <div className={s.div} style={{backgroundImage: `url(${data[selector].div})`}}>
                <div className={s.data}>
                    <h2 className={s.title}>{data[selector].title}</h2>
                    <p className={s.text}>{data[selector].text}</p>
                </div>
            </div>
            <img className={s.img} src={data[selector].img} alt='slide img'/>
        </div>
    )
}