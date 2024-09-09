import React, { useState } from "react";
import style from "./Signup.module.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Helmet } from 'react-helmet';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

const Signup = () => {
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validatePassword = (password) => {
        const minLength = /.{6,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) {
            return "A senha deve ter no mínimo 6 caracteres.";
        }
        if (!upperCase.test(password)) {
            return "A senha deve conter pelo menos 1 letra maiúscula.";
        }
        if (!lowerCase.test(password)) {
            return "A senha deve conter pelo menos 1 letra minúscula.";
        }
        if (!number.test(password)) {
            return "A senha deve conter pelo menos 1 número.";
        }
        if (!specialChar.test(password)) {
            return "A senha deve conter pelo menos 1 caractere especial.";
        }
        return "";
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword));
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError("As senhas não coincidem.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setConfirmPasswordError("As senhas não coincidem.");
        } else {
            setConfirmPasswordError("");
        }
    }


    return (
        <div className={style.container}>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <Card title="Cadastro" subTitle="Insira seus dados para criar uma conta" footer={""} header={""} className={style.signupCard}>
                <label htmlFor="username">Nome Completo </label>
                <InputText inputStyle={{ width: '100%' }} className={style.signinData} aria-describedby="username-help" required/>
                <label htmlFor="emailField">E-mail </label>
                <InputText inputStyle={{ width: '100%' }} className={style.signinData} aria-describedby="username-help" required/>
                <label htmlFor="password">Senha </label>
                <Password inputStyle={{ width: '100%' }} className={style.signinData} value={password} onChange={handlePasswordChange} toggleMask required/>
                {passwordError && <small className="text-red-500">{passwordError}</small>}
                <label htmlFor="confirmPassword">Confirme a senha </label>
                <Password inputStyle={{ width: '100%' }} className={style.signinData} value={confirmPassword} onChange={handleConfirmPasswordChange} toggleMask required/>
                {confirmPasswordError && <small className="text-red-500">{confirmPasswordError}</small>}
                <a href="/login"><Button label="Cancelar" className="bg-red-400 border-red-400 m-2" /></a>
                <a href="/"><Button label="Confirmar" className="bg-green-400 border-green-400 m-2" disabled={passwordError || confirmPasswordError} /></a>
            </Card>
                
        </div>
                    
    );
}

export default Signup;