import {MovieAction, MovieActionEnum, MovieState} from "./types";
import {IMovie} from "../../../types/IMovie";


const initialState:MovieState={
    id:0,
    Movie: [] as IMovie[],
    error: '',
    opencard:false,
    isLoading: false,




}

export default function authReducer(state = initialState, action: MovieAction): MovieState {
    switch (action.type) {
        case MovieActionEnum.SET_MOVIE:
            return {...state, Movie: action.payload}
        case MovieActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case MovieActionEnum.SET_OPENCARD:
            return {...state, opencard:action.payload}
        case MovieActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }}