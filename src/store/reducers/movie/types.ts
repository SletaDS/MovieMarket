import {IMovie} from "../../../types/IMovie";

export interface MovieState {
    id:number;
    Movie:IMovie[]
    isLoading: boolean;
    error: string;
    opencard:boolean
}

export enum MovieActionEnum {
    SET_ERROR = "SET_ERROR",
    SET_MOVIE = "SET_MOVIE",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_OPENCARD="SET_OPENCARD"
}
export interface SetErrorAction {
    type: MovieActionEnum.SET_ERROR;
    payload: string;
}
export interface SetOpencardAction {
    type: MovieActionEnum.SET_OPENCARD;
    payload: boolean;
}
export interface SetMovieAction {
    type: MovieActionEnum.SET_MOVIE;
    payload:IMovie[];
}
export interface SetIsLoadingAction {
    type: MovieActionEnum.SET_IS_LOADING;
    payload: boolean;
}
export type MovieAction =
    SetMovieAction |
    SetErrorAction |
    SetIsLoadingAction |
    SetOpencardAction