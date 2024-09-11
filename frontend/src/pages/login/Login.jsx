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
        if(user.email == "eduardo" && user.password == "A1@bbb"){
            let token = "backend token";
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.email);
            navigate("/dashboard");
        } else if(user.email == "user" && user.password == "B1@bbb"){
            let token = "backend token";
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.email);
            navigate("/");
        } else {
            alert("usuário ou senha incorretos");
        }
    }

    return (
        <div className={style.containerLog}>
            <Helmet>
                <title>{t('login')}</title>
            </Helmet>
            <Card title="Login" subTitle={t('insertInfo')} footer={""} header={""} className={style.cardLogin}>
                <img src="/img/sitelogo.png" alt="Logo" className={style.logo} />
                <div className="flex align-items-center m-2">
                    <label className={`${style.loginLabel} mr-2`} htmlFor="email">{t('email')}</label>
                    <InputText name="email" className="flex-grow-1" onChange={handleChange} aria-describedby="username-help" required/>
                </div>
                <div className="flex align-items-center m-2">
                    <label className={`${style.loginLabel} mr-2`} htmlFor="password">{t('password')}</label>
                    <Password inputStyle={{width:'100%'}} name="password" className="flex-grow-1" onChange={handleChange} feedback={false} toggleMask required/>
                </div>
                <a href="/recoverpass" className={style.recPass}>{t('forgotPassword')}</a>
                <p>{t('noAccount')}<a href="/signup" className={style.aLogin}>{t('signupNow')}</a></p>
                <Button label={t('button.login')} onClick={login} className={style.button} />
            </Card>   
        </div>
    );
}
export default Login;