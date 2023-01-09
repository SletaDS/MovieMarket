import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction, SetIsLoadingAction,
    SetUserAction
} from "./types";
import {IUser} from "../../../types/IUser";
import {APPDispatch} from "../../index";
import axios from "axios";
import {Ifetch} from "../../../types/Ifetch";

const url:string='https://moviemark-fd9c8-default-rtdb.europe-west1.firebasedatabase.app/'

export const AuthActionCreators={
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    register:(payload:IUser)=>async (dispatch:APPDispatch)=>{
        dispatch(AuthActionCreators.setIsLoading(true))
        try {


        let indicator:boolean=true
        let response = await axios.get<Ifetch>(url+'Movie%20market.json')
        setTimeout(()=>{
         for(let item of Object.values(response.data.users)){
             if(item.email == payload.email || item.nickname == payload.nickname){
               dispatch(AuthActionCreators.setError("This user already exist"))
                 setTimeout(()=>dispatch(AuthActionCreators.setError('')),2000)
                 dispatch(AuthActionCreators.setIsLoading(false))
                 indicator=false
             }
         }
         if(indicator) {
             axios.post<IUser>(url+"Movie%20market/users.json", payload)
                 .then(function (response) {
                     console.log(response);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
             dispatch(AuthActionCreators.setIsLoading(false))
             dispatch(AuthActionCreators.setError("succes"))
             setTimeout(()=> dispatch(AuthActionCreators.setError("")),2000)
         }},2000)
    }catch (e){
            console.log("POST error")
        }
    },
    login:(email:string,password:string)=>async (dispatch:APPDispatch)=>{
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                let response = await axios.get<Ifetch>(url+"Movie%20market.json")
                const mockUser =Object.values(response.data.users).find(user => user.email === email && user.password === password);
                if (mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('nickname', mockUser.nickname);
                    localStorage.setItem('email', mockUser.email);
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Not correct login or password'));
                    setTimeout(()=>dispatch(AuthActionCreators.setError('')),6000)
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error in login'))
        }
    },
    logout:()=>async (dispatch:APPDispatch)=>{
            localStorage.removeItem('auth')
            localStorage.removeItem('email')
        localStorage.removeItem('nickname')
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false))

    },
}