import React, { useState } from "react";
import "./Login.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {
    const [value, setValue] = useState('');

    return (
        <div>
            <Card title="Login" subTitle="Insira suas informações de acesso" footer={""} header={""} className="md:w-30rem card">
                <label htmlFor="username">Usuário </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" required/>
                <label htmlFor="password">Senha </label>
                <Password inputStyle={{ width: '100%' }} className="w-full mb-3" value={value} onChange={(e) => setValue(e.target.value)} toggleMask required/>
                <a href="/recoverpass" className="block text-center text-sm mb-4">Esqueceu a senha?</a>
                Não tem uma conta?<a href="/signup" className="block text-center text-sm mb-4">Cadastre-se</a>
                <Button label="Acessar" />
            </Card>

            
        </div>
    );
}
export default Login;