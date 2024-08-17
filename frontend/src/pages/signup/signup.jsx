import React from "react";
import "./Signup.css";
import { Card } from 'primereact/card';

const Signup = () => {
    return (
        <div>
            <Card title="Login" subTitle="Insira suas informações de acesso" footer={""} header={""} className="md:w-30rem card">
            <div class="field">
                    <label for="firstname1">Firstname</label>
                    <input id="firstname1" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                </div>
                <div class="field">
                    <label for="lastname1">Lastname</label>
                    <input id="lastname1" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                </div>
            </Card>
                
        </div>
                    
    );
}

export default Signup;