import React, { useState } from "react";
import "./ChangePass.module.css";
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Helmet } from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ChangePass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
    };

    return (
        <div>
            <Helmet>
                <title>Alterar senha</title>
            </Helmet>
            <Card title="Alteração de senha" subTitle="Insira uma nova senha e confirme-a" footer={""} header={""} className="md:w-30rem signupcard">
                <label htmlFor="emailField" className="mb-1">Digite seu e-mail </label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" type="email" required/>
                <label htmlFor="codeRecover">Código de recuperação</label>
                <InputText inputStyle={{ width: '100%' }} className="w-full mb-3" aria-describedby="username-help" required/>
                <label htmlFor="password">Nova senha </label>
                <Password inputStyle={{ width: '100%' }} className="w-full mb-3" value={password} onChange={handlePasswordChange} toggleMask required/>
                {passwordError && <small className="p-error">{passwordError}</small>}
                <label htmlFor="confirmPassword">Confirme a nova senha </label>
                <Password inputStyle={{ width: '100%' }} className="w-full mb-3" value={confirmPassword} onChange={handleConfirmPasswordChange} toggleMask required/>
                {confirmPasswordError && <small className="p-error">{confirmPasswordError}</small>}
                <a href="/login"><Button label="Cancelar" className="bg-red-400 border-red-400 m-2" /></a>
                <a href="/"><Button label="Confirmar" className="bg-green-400 border-green-400 m-2" disabled={passwordError || confirmPasswordError} /></a>
            </Card>
        </div>
    );
}

export default ChangePass;