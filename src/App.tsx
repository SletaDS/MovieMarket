import React, {Dispatch, useEffect} from 'react';
import AppRouter from "./Component/AppRouter";
import {GithubOutlined} from "@ant-design/icons";
import "./app.css"
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "./store/reducers/auth/actioncreator";
import {IUser} from "./types/IUser";
function App() {
    const dispatch: Dispatch<any> = useDispatch()
    useEffect(()=>{
        if(localStorage.getItem('auth')){
            dispatch(AuthActionCreators.setUser({email:localStorage.getItem('email' || ' ')} as IUser))
            dispatch(AuthActionCreators.setIsAuth(true))
        }
    },[])
  return (
      <div style={{background:"#141414",width:'100%',height:'100%',fontFamily:" 'Roboto', sans-serif"
      }}>

            <AppRouter/>

          <footer style={{display:'flex',alignItems:"center",flexDirection:'column',marginTop:"90px",height:"100%"}}>
              <a href="https://github.com/SletaDS" style={{fontSize:'24px'}} ><GithubOutlined /></a>
              <a style={{fontSize:"12px",fontFamily:" 'Roboto', sans-serif"
                  ,color:"#e5e5e5",opacity:"0.6",margin:"12px"}}>©Made by Daniel Sl</a>
          </footer>
      </div>

  );
}

export default App;
