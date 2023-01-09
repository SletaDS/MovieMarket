import {IMovie} from "../../../types/IMovie";
import {MovieActionEnum, SetErrorAction, SetIsLoadingAction, SetMovieAction, SetOpencardAction} from "./types";
import {APPDispatch} from "../../index";
import axios from "axios";
import {Ifetch} from "../../../types/Ifetch";

const url:string='https://moviemark-fd9c8-default-rtdb.europe-west1.firebasedatabase.app/'

export const MovieActionCreators= {
    setOpencard:(payload: boolean): SetOpencardAction => ({type: MovieActionEnum.SET_OPENCARD, payload}),
    setMovie: (payload: IMovie[]): SetMovieAction => ({type: MovieActionEnum.SET_MOVIE, payload}),
    searchMovie:(name:string)=>async (dispatch:APPDispatch)=>{
    try {
        dispatch(MovieActionCreators.setIsLoading(true));
        setTimeout(async () => {
            let response = await axios.get<Ifetch>(url+"Movie%20market.json")
            let arr:IMovie[]=[]
            for (let item of response.data.movie){
                if (
                    item.name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .includes(name.toLowerCase().replace(/\s/g, ""))
                ){
                   arr.push(item);
                }}
            dispatch(MovieActionCreators.setMovie(arr));
            dispatch(MovieActionCreators.setIsLoading(false));
        }, 1000)
    } catch (e) {
        dispatch(MovieActionCreators.setError('Error in login'))
    }
},
    getMovie: ()=>async (dispatch:APPDispatch)=> {
        try {
            dispatch(MovieActionCreators.setIsLoading(true));
            setTimeout(async () => {
                    let response = await axios.get<Ifetch>(url+"Movie%20market.json")
                    const mockMovie = response.data
                    dispatch(MovieActionCreators.setMovie(mockMovie.movie))
                    dispatch(MovieActionCreators.setIsLoading(false));},1000)
        }catch (e) {
            dispatch(MovieActionCreators.setError('Error in login'))
        }


    },
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: MovieActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: MovieActionEnum.SET_ERROR, payload}),
}