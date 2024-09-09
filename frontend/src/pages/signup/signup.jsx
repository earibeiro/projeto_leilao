import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import style from './Signup.module.css';
import { useTranslation } from 'react-i18next';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {t} = useTranslation();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value !== confirmPassword) {
            setPasswordError('As senhas não coincidem');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError('As senhas não coincidem');
        } else {
            setConfirmPasswordError('');
        }
    };

    return (
        <div className={style.containerUp}>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <Card title={t('signupNow')} subTitle={t('insertInfoSignup')} footer={""} header={""} className={style.signupCard}>
                <label htmlFor="username">{t('fullName')} </label>
                <InputText id="username"  className={style.inputField} aria-describedby="username-help" required/>
                <label htmlFor="emailField">{t('email')} </label>
                <InputText id="emailField" className={style.inputField} aria-describedby="email-help" required/>
                <label htmlFor="password">{t('password')} </label>
                <Password id="password" className={style.inputField} value={password} onChange={handlePasswordChange} toggleMask required/>
                {passwordError && <small className={style.textRed}>{passwordError}</small>}
                <label htmlFor="confirmPassword">{t('confirmPassword')} </label>
                <Password id="confirmPassword" className={style.inputField} value={confirmPassword} onChange={handleConfirmPasswordChange} toggleMask required/>
                {confirmPasswordError && <small className={style.textRed}>{confirmPasswordError}</small>}
                <a href="/login"><Button label={t('button.cancel')} className={style.cancelButton} /></a>
                <a href="/"><Button label={t('button.confirm')} className={style.confirmButton} disabled={passwordError || confirmPasswordError} /></a>
            </Card>
        </div>
    );
}

export default Signup;