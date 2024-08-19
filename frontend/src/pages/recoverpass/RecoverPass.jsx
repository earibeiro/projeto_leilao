import React from 'react';
import './RecoverPass.css';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const RecoverPass = () => {
    return (
        <div>
            <Helmet>
                <title>Recuperar senha</title>
            </Helmet>
            <Card title="Recupere sua senha" subTitle="Insira seu e-mail" footer={""} header={""} className="md:w-30rem signupcard">
                <label htmlFor="emailField" className="mb-1">Digite seu e-mail </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" type="email" required/>
                <a href="/login"><Button label="Cancelar" className="bg-red-400 border-red-400 m-2" /></a>
                <a href="/changepass"><Button label="Confirmar" className="bg-green-400 border-green-400 m-2" /></a>
            </Card>
        </div>
    );
}

export default RecoverPass;