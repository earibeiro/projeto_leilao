import React, { useState } from "react";
import style from "./Login.module.css";
import { FloatLabel } from 'primereact/floatlabel';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const Login = () => {
    const [user, setUser] = useState({email:"", password:""});
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [error, setError] = useState("");
    const personService = new PersonService();
    
    const handleChange = (input) =>{
        setUser({...user, [input.target.name]:input.target.value});
    }

    const login = async () =>{
        try{
            const response = await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.email);
            navigate("/");
        } catch (err) {
            console.log(err);
            console.log(user);
            setError(t('invalidCredentials'));
        }
    }

    return (
        <div className={style.containerLog}>
            <Helmet>
                <title>{t('login')}</title>
            </Helmet>
            <Card title="Login" subTitle={t('insertInfo')} footer={""} header={""} className={style.cardLogin}>
                <img src="/img/sitelogo.png" alt="Logo" className={style.logo} />
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="email" className="flex-grow-1">
                        <InputText name="email" className="flex-grow-1 w-full" onChange={handleChange} aria-describedby="username-help" required/>
                    <label htmlFor="email">{t('email')}</label></FloatLabel>
                    
                </div>
                <div className="flex align-items-center m-2">
                    <FloatLabel htmlFor="password" className="flex-grow-1">
                        <Password inputStyle={{width:'100%'}} name="password" className="w-full" onChange={handleChange} feedback={false} toggleMask required/>    
                    <label htmlFor="password">{t('password')}</label></FloatLabel>
                </div>
                <a href="/recoverpass" className={style.recPass}>{t('forgotPassword')}</a>
                <p>{t('noAccount')}<a href="/signup" className={style.aLogin}>{t('signupNow')}</a></p>
                <small className={style.textRed}>{error}</small>
                <br/>
                <Button label={t('button.login')} onClick={login} className={style.button} />
            </Card>   
        </div>
    );
}
export default Login;