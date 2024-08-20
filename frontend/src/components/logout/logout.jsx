import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <>
            <Button label="Sair" onClick={logout} className="bg-red-400 border-red-400" />
        </>
    )
}
export default Logout;