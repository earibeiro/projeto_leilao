import React, { useState } from "react";
import "./Login.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {
    const [value, setValue] = useState('');

    return (
        <div class="main">
            <Card class="card" title="Login" subTitle="Insira suas informações de acesso" footer={""} header={""} className="md:w-28rem">
                <label htmlFor="username">Usuário </label>
                <InputText id="username" aria-describedby="username-help" />
                <small id="username-help">
                    <br/>Enter your username to reset your password.<br/>
                </small>
                <label htmlFor="password">Senha </label>
                <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
                <Button class="submit" label="Submit" />
            </Card>

            
                

        </div>
    );
}
export default Login;