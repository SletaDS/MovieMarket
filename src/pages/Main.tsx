import React, {Dispatch, FC, ReactNode, useEffect, useRef, useState} from 'react';
import '../app.css'
import {Avatar, Button, Carousel, Divider, Dropdown, Input, InputRef, MenuProps, Modal, Space, Spin} from 'antd';
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/actioncreator";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {usetypedselector} from "../hooks/usetypedselector";
import {MovieActionCreators} from "../store/reducers/movie/actioncreator";
import {NavLink} from "react-router-dom";

const Main:FC = () => {
    const [headervisible,setheadervisible]=useState<boolean>(true)
    const [carouselvisible,setcarouselvisible]=useState<boolean>(true)
    const  {Movie,isLoading}=usetypedselector(state=>state.movie)
    const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;


    const dispatch: Dispatch<any> = useDispatch()

    const searchInput=useRef<HTMLInputElement>(null);


    useEffect( ()=> {
        dispatch(MovieActionCreators.getMovie());
    },[])


    function Search(){
        if(searchInput.current && searchInput.current){
            if(searchInput.current.value.length > 0){
                dispatch(MovieActionCreators.searchMovie(searchInput.current.value))
                setcarouselvisible(false)

            }
            if(searchInput.current.value.length === 0){
                dispatch(MovieActionCreators.getMovie());
                setcarouselvisible(true)

            }
        }
    }


window.onscroll=()=>{
    if(window.scrollY<=70){
        if(headervisible===false) {
            setheadervisible(true)
        }
    }else {
        if(headervisible===true) {
            setheadervisible(false)
        }
    }

}

    const items: MenuProps['items'] = [
        {
            label: (
                <div>
                    <p>{localStorage.getItem('nickname')}</p>
                    <p>{localStorage.getItem('email')}</p>
                </div>
            ),
            key: '1',
        },
    ];




    function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
        let timeoutID: number = 0;
        return function(this: any, ...args: any[]) {
            clearTimeout(timeoutID);
            timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
        } as F;
    }
    const contentStyle = {
        backgroundColor: "white",
        borderRadius: '8px',
        margin:'8px',
        width:"170px"

    };

    return (

        <div  className={'mainheigth'}>
            <div className={"headermain"} style ={headervisible?  {background:"transparent"}:{background: "#141313"} }>
                        <Dropdown
                            menu={{ items }}
                            dropdownRender={(menu) => (
                                <div style={contentStyle}>
                                    {React.cloneElement(menu as React.ReactElement,{style:{ boxShadow: 'none'}})}
                                    <Divider style={{ margin: 0 }} />
                                    <Space style={{ padding: 8 }}>
                                        <Button size={'small'} onClick={()=>{dispatch(AuthActionCreators.logout())}} style={{width:"100px"}} type="primary">Exit</Button>
                                    </Space>
                                </div>
                            )}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <button style={{border:"none",background:"transparent",margin:"12px",cursor:"pointer"}}>
                                        <Avatar size={54} icon={<UserOutlined />} />
                                    </button>
                                </Space>
                            </a>
                        </Dropdown>
            <input ref={searchInput} type={'search'} onChange={debounce(Search,1000)} className={"input"} placeholder={'Search'}/></div>
            {
                isLoading ?
                    <div className={'block'} style={{justifyContent: "center"}}><Spin style={{marginTop: "40vh"}}
                                                                                      indicator={antIcon}/></div> :
            carouselvisible ? <>
                {Movie[1] ?
                    <div className={'banner2'}
                         style={{backgroundImage: ` linear-gradient(0deg, rgb(20, 20, 20) 2%, rgba(20, 20, 20, 0.46) 190%), url(${Movie[1].banner})`}}>
                        <div style={{paddingTop: "210px", paddingLeft: "70px"}}>
                            <h1 style={{fontSize: "70px"}} className={'font'}>{Movie[1].name}</h1>
                            <NavLink to={`/movie/${Movie[1].id}`}>
                                <button className={"button"}>Detail</button>
                            </NavLink>
                            <div className={'banner-description'}
                            >{Movie[1].description}</div>
                        </div>
                    </div> : null}
                    <>
                        <div>
                            <h1 className={'h1'}>Si-fi</h1>
                            <div className={'block'}>{Movie.map((movie, index) =>movie.genre.find(genre=>genre==="science fiction")?
                                <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                                    style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>:null)}
                            </div>
                    </div>
                        <div>
                            <h1 className={'h1'}>Drama</h1>
                            <div className={'block'}>{Movie.map((movie, index) =>movie.genre.find(genre=>genre==="drama")?
                                <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                                    style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>:null)}
                            </div>
                        </div>
                        <div>
                            <h1 className={'h1'}>Action/smash-hit</h1>
                            <div className={'block'}>{Movie.map((movie, index) =>movie.genre.find(genre=>genre==="action")?
                                <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                                    style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>:null)}
                            </div>
                        </div>
                        <div>
                            <h1 className={'h1'}>Thriller/horror</h1>
                            <div className={'block'}>{Movie.map((movie, index) =>movie.genre.find(genre=>genre==="thriller"||genre==="horror")?
                                <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                                    style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>:null)}
                            </div>
                        </div>
                        <div>
                            <h1 className={'h1'}>All</h1>
                            <div className={'block'}>{Movie.map((movie, index) =>
                                <NavLink key={index} className={"card"} to={`/movie/${movie.id}`}> <img
                                    style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>)}
                            </div>
                        </div>

                    </>

                </> :    <div className={'heigth100'} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h1 className={"searchh1"}>Search</h1>
                <div className={'block'} style={{justifyContent:'center'}}>{Movie.map((movie, index) =>
                    <NavLink key={index} className={"card"} to={`/movie/${index}`}> <img
                        style={{width: "100%", height: "100%",}} src={movie.picture}></img></NavLink>)}
                </div>

            </div>
            }



        </div>
    );
};

export default Main;
