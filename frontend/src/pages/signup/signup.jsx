import React, { useState } from "react";
import "./Signup.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Helmet } from 'react-helmet';

const Signup = () => {
    const[value, setValue] = useState('');

    return (
        <div>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <Card title="Cadastro" subTitle="Insira seus dados para criar uma conta" footer={""} header={""} className="md:w-30rem card">
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="nome" value={value} onChange={(e) => setValue(e.target.value)} />
                        <label for="nome">Nome</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="nome" value={value} onChange={(e) => setValue(e.target.value)} />
                        <label for="nome">E-mail</label>
                    </FloatLabel>
                </div>
            </Card>
                
        </div>
                    
    );
}

export default Signup;