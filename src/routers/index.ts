import React from "react";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Cardpage from "../pages/Cardpage";


export interface IRoute{
    path:string;
    element:React.ComponentType | React.ComponentProps<any>;
}
export enum RouteNames{
    LOGIN='/login',
    MAIN='/',
    CARDS='/movie/:id',
}


export const privaterouters:IRoute[]=[
    {path:RouteNames.LOGIN,element:Login}

]
export const publicerouters:IRoute[]=[
    {path:RouteNames.MAIN,element:Main}

]
export const cardsrouters:IRoute[]=[
    {path:RouteNames.CARDS,element:Cardpage}

]