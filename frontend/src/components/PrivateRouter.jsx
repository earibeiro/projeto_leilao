import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRouter = () => {

    const isAuthenticated = localStorage.getItem("token")?true:false;

    return (isAuthenticated?<Outlet/>:<Navigate to="/login"/>);

}

export default PrivateRouter;