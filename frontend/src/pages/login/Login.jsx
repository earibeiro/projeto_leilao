import React from "react";
import "./Login.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {
    return (
        <div>
           <Card title="Login">
                <InputText/>
                <Password feedback={false}/>
                <Button label="Login"/>
           </Card>
           <div class="grid">
             <div class="col-12 md:col-6 lg:col-3">
                <div class="text-center p-3 border-round-sm bg-primary font-bold">col-12 md:col-6 lg:col-3</div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="text-center p-3 border-round-sm bg-primary font-bold">col-12 md:col-6 lg:col-3</div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="text-center p-3 border-round-sm bg-primary font-bold">col-12 md:col-6 lg:col-3</div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="text-center p-3 border-round-sm bg-primary font-bold">col-12 md:col-6 lg:col-3</div>
            </div>
            </div>
        </div>
    );
}
export default Login;