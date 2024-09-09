import React, { useState } from "react";
import style from "./Login.module.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
    const [user, setUser] = useState({email:"", password:""});
    const navigate = useNavigate();
    const {t} = useTranslation();
    
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
            <Card title="Login" subTitle={t('insertInfo')} footer={""} header={""} className={style.cardLogin}>
                <img src="/img/sitelogo.png" alt="Logo" className={style.logo} />
                <label className={style.loginLabel} htmlFor="email">{t('email')} </label>
                <InputText inputStyle={{ width: '100%' }} name="email" className={style.loginMail} onChange={handleChange} aria-describedby="username-help" required/>
                <label className={style.loginLabel} htmlFor="password">{t('password')} </label>
                <Password inputStyle={{ width: '100%' }} name="password" className={style.loginPass} onChange={handleChange} toggleMask required/>
                <a href="/recoverpass" className={style.recPass}>{t('forgotPassword')}</a>
                <p>{t('noAccount')}</p><a href="/signup" className={style.aLogin}>{t('signupNow')}</a>
                <Button label={t('button.login')} onClick={login}  className={style.button} />
            </Card>

            
        </div>
    );
}
export default Login;