import React, { useState } from "react";
import "./Signup.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Helmet } from 'react-helmet';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

const Signup = () => {
    const[value, setValue] = useState('');

    return (
        <div>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <Card title="Cadastro" subTitle="Insira seus dados para criar uma conta" footer={""} header={""} className="md:w-30rem signupcard">
                <label htmlFor="username">Nome Completo </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" required/>
                <label htmlFor="username">E-mail </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" required/>
                <label htmlFor="password">Senha </label>
                <Password inputStyle={{ width: '100%' }} className="w-full mb-3" value={value} onChange={(e) => setValue(e.target.value)} toggleMask required/>
                <a href="/login"><Button label="Cancelar" className="bg-red-400 border-red-400 m-2" /></a>
                <Button label="Cadastrar" className="bg-green-400 border-green-400 m-2" />
            </Card>
                
        </div>
                    
    );
}

export default Signup;