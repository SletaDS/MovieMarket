import React, {FC, useState} from 'react';
import {Button, Modal, } from "antd";
import '../app.css'
import {NavLink, useNavigate, useParams,} from "react-router-dom";

import {usetypedselector} from "../hooks/usetypedselector";
const Cardpage:FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
  const {Movie}=usetypedselector(state=>state.movie)
    let {id} = useParams<'id'>()

        const movie=Movie[id ? +id : 1]


    return (

           <div style={{display:"flex",flexDirection:'column',height:'100%'}}> <div className={'banner1'}  style={{backgroundImage:` linear-gradient(0deg, rgb(20, 20, 20) 2%, rgba(20, 20, 20, 0.46) 190%), url(${movie.banner})`,height:'100%'}}>
           <Button onClick={()=>navigate(-1)} style={{margin:"15px",width:"70px",background:"transparent",color:'white'}} size={'large'}>
               Back
           </Button>

               <div className={'cardpage'}>
                   <img className={'picture'} style={{opacity:0.9}} src={movie.picture} />
                   <div className={'cardpage'} style={{display:"flex",height:"100%",flexDirection:'column',marginTop:'33px',color:"white"}}>
                       <h1 style={{fontSize:"50px"
                           ,fontWeight:'bold'}}>{movie.name}</h1>
                       <h2 className={'font'}>Directed by <b style={{fontWeight:'bold'}}>{movie.author}</b></h2>
                       <h3 className={'font'}>{movie.time}</h3>
                       <h3 className={'font'}>{movie.genre[0]} | {movie.genre[1]} | {movie.genre[2]}</h3>
                       <button className={'button'} onClick={()=>setIsModalOpen(true)}>Play Trailer</button>
                       <p style={{fontSize:"17px",paddingTop:"25px",lineHeight:"22px"}}>{movie.description}</p>

                   </div>
               </div>
             </div> <div style={{height:"100%"}}>
               <h1 style={{fontSize:"30px"
                   ,color:'white',marginLeft:'40px'}}>Cast</h1>

               <div style={{display:'flex',flexDirection:"row",flexWrap:'wrap',margin:'15px'}}> {movie.cast.map((item:string[])=><div key={item[0]} style={{display:"flex",flexDirection:'column',alignItems:'center'}}><img src={item[0]} style={{backgroundSize:"cover",objectFit:"cover"}} className={'cast'}/><p style={{color:"white"}}>{item[1]}</p></div>)}</div>
           </div>

           <div style={{height:"100%"}}>
               <h1 style={{color:'white',fontSize:"30px",margin:"20px"}}>Another films</h1>
               <div className={'block'}>{[Movie[1]].map((movie, index) =>
                   <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                       style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>)}
               </div>

           </div>
               <Modal open={isModalOpen} style={{display:'flex',width:"440px"}} onCancel={handleCancel}>
                   <iframe width="460" height="215" src={movie.trailer}
                           title="YouTube video player" frameBorder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                           allowFullScreen></iframe>
               </Modal>
           </div>


    );
};

export default Cardpage;