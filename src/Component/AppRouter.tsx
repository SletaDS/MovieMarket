import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {cardsrouters, privaterouters, publicerouters, RouteNames} from "../routers";
import {usetypedselector} from "../hooks/usetypedselector";


const AppRouter = () => {
    const {isAuth}=usetypedselector(state=>state.auth)
    return (
                <>
            {isAuth?

                <Routes>
                    {publicerouters.map((route) =>
                        <Route key={route.path}
                               path={route.path}
                               element={<route.element/>}></Route>)}
                    {cardsrouters.map((route) =><Route
                        key={route.path}
                        path={route.path}
                        element={<route.element/>}
                    />)}
                    <Route
                        path="/login"
                        element={<Navigate to={RouteNames.MAIN} replace />}
                    />
                    </Routes>

                :
                <Routes>
                    {privaterouters.map((route) =>
                        <Route key={route.path}
                               path={route.path}
                               element={<route.element/>}></Route>)}
                    <Route
                        path="*"
                        element={<Navigate to={RouteNames.LOGIN} replace />}
                    />
                </Routes>}</>

        );
};

export default AppRouter;