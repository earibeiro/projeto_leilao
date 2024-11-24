import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import style from './ChangePass.module.css';
import { useTranslation } from 'react-i18next';
import PersonService from '../../services/PersonService';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [code, setCode] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const validatePassword = (password) => {
        const minLength = 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) {
            return t('minLength', { minLength });
        }
        if (!specialChar.test(password)) {
            return t('minSpecial');
        }
        return "";
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationError = validatePassword(newPassword);
        if (validationError) {
            setPasswordError(validationError);
        } else if (newPassword !== confirmPassword) {
            setPasswordError(t('nomatch'));
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setPasswordError(t('nomatch'));
        } else {
            setPasswordError('');
        }
    };

    const handleValidationCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleChangePassword = async () => {
        if (!password || !confirmPassword) {
            alert(t('allFieldsRequired'));
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError(t('nomatch'));
            return;
        }

        try {
            const email = localStorage.getItem('email');
            await personService.passwordRecovery({ email, password, code });
            localStorage.removeItem('email');
            navigate('/login');
        } catch (error) {
            alert(t('errorChangingPassword'));
        }
    };

    return (
        <div className={style.containerCP}>
            <Helmet>
                <title>{t('changePassword')}</title>
            </Helmet>
            <Card title={t('changePassword')} subTitle={t('enterNPassword')} className={style.changeCard}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="validationCode" className="flex-grow-1">
                        <InputText id="validationCode" name="validationCode" className="flex-grow-1 w-full" onChange={handleValidationCodeChange} required />
                        <label htmlFor="validationCode">{t('validationCode')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="password" className="flex-grow-1">
                        <Password id="password" name="password" inputStyle={{width:'100%'}} className="w-full" value={password} feedback={false} onChange={handlePasswordChange} toggleMask required />
                        <label htmlFor="password">{t('newPassword')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="confirmPassword" className="flex-grow-1">
                        <Password id="confirmPassword" name="confirmPassword" inputStyle={{width:'100%'}} className="w-full" value={confirmPassword} feedback={false} onChange={handleConfirmPasswordChange} toggleMask required />
                        <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                    </FloatLabel>
                </div>
                {passwordError && <small className={style.textRed}>{passwordError}</small>}
                <div className={style.buttonGroup}>
                    <Button label={t('button.cancel')} className="m-2" onClick={() => window.location.href = '/login'} />
                    <Button label={t('button.confirm')} className="m-2" onClick={handleChangePassword} disabled={passwordError} />
                </div>
            </Card>
        </div>
    );
}

export default ChangePass;