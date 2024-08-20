import React, { useState } from "react";
import "./Login.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleChange = (input) =>{
        setUser({...user, [input.target.name]:input.target.value});
    }

    const login = () =>{
        //chamada para o backend para verificar as credenciais
        if(user.email == "eduardo" && user.password == "A1@bbb"){
            let token="backend token";
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.email);
            navigate("/");
        } else {
            alert("usuário ou senha incorretos");
        }
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Card title="Login" subTitle="Insira suas informações de acesso" footer={""} header={""} className="md:w-24rem p-0 card">
                <img src="/img/sitelogo.png" alt="Logo" className="logo" />
                <label htmlFor="email">Email </label>
                <InputText inputStyle={{ width: '100%' }} name="email" className="w-full mb-3" onChange={handleChange} aria-describedby="username-help" required/>
                <label htmlFor="password">Senha </label>
                <Password inputStyle={{ width: '100%' }} name="password" className="w-full mb-3" onChange={handleChange} toggleMask required/>
                <a href="/recoverpass" className="block text-center text-sm mb-4">Esqueceu a senha?</a>
                <p className="inline">Não tem uma conta?</p><a href="/signup" className="block text-center text-sm mb-4">Cadastre-se</a>
                <Button label="Acessar" onClick={login} className="bg-green-400 border-green-400" />
            </Card>

            
        </div>
    );
}
export default Login;