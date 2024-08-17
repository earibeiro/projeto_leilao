import React, { useState } from "react";
import "./Login.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';

const Login = () => {
    const [value, setValue] = useState('');

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Card title="Login" subTitle="Insira suas informações de acesso" footer={""} header={""} className="md:w-24rem p-0 card">
                <img src="/img/sitelogo.png" alt="Logo" className="logo" />
                <label htmlFor="username">Usuário </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" required/>
                <label htmlFor="password">Senha </label>
                <Password inputStyle={{ width: '100%' }} className="w-full mb-3" value={value} onChange={(e) => setValue(e.target.value)} toggleMask required/>
                <a href="/recoverpass" className="block text-center text-sm mb-4">Esqueceu a senha?</a>
                <p className="inline">Não tem uma conta?</p><a href="/signup" className="block text-center text-sm mb-4">Cadastre-se</a>
                <Button label="Acessar" className="bg-green-400 border-green-400" />
            </Card>

            
        </div>
    );
}
export default Login;