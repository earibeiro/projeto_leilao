import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const logout = () =>{
        console.log("Usuário deslogado");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/login';
    }

}
export default Logout;