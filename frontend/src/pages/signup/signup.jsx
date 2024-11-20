import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import style from './Signup.module.css';
import { useTranslation } from 'react-i18next';
import PersonService from '../../services/PersonService';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const personService = new PersonService();

    useEffect(() => {
        if (name && email && password && confirmPassword && !error) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [name, email, password, confirmPassword, error]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword !== confirmPassword) {
            setError(t('nomatch'));
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setError(t('nomatch'));
        } else {
            setError('');
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert(t('allFieldsRequired'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('nomatch'));
            return;
        }

        const person = {
            name,
            email,
            password,
        };

        try {
            await personService.create(person);
            alert(t('signupSuccess'));
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
            alert(t('signupError'));
        }
    };

    return (
        <div className={style.containerUp}>
            <Helmet>
                <title>{t('signup')}</title>
            </Helmet>
            <Card title={t('signupNow')} subTitle={t('insertInfoSignup')} className={style.signupCard}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="name" className="flex-grow-1">
                        <InputText id="name" name="name" className="flex-grow-1 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="name">{t('fullName')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="emailField" className="flex-grow-1">
                        <InputText id="emailField" name="email" className="flex-grow-1 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="emailField">{t('email')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="password" className="flex-grow-1">
                        <Password id="password" name="password" className="flex-grow-1 w-full" inputStyle={{ width:'100%' }} value={password} onChange={handlePasswordChange} toggleMask required />
                        <label htmlFor="password">{t('password')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="confirmPassword" className="flex-grow-1">
                        <Password id="confirmPassword" name="confirmPassword" className="flex-grow-1 w-full" inputStyle={{ width:'100%' }} value={confirmPassword} onChange={handleConfirmPasswordChange} toggleMask required />
                        <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                    </FloatLabel>
                </div>
                <div className={style.buttonGroup}>
                    <Button label={t('button.cancel')} className="m-2" onClick={() => window.location.href = '/login'} />
                    <Button label={t('button.confirm')} className="m-2" onClick={handleSignup} disabled={!isFormValid} />
                    <br/>
                    <small className={style.textRed}>{error}</small>
                </div>
            </Card>
        </div>
    );
}

export default Signup;