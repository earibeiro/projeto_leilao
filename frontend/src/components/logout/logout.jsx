import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        console.log("Usuário deslogado");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div>
            <Button label="Logout" onClick={logout} />
        </div>
    );
}

export default Logout;