import React, { useState } from "react";
import style from "./ChangePass.module.css";
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Helmet } from 'react-helmet';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const ChangePass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {t} = useTranslation();

    const validatePassword = (password) => {
        const minLength = /.{6,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) {
            return t('minLength');
        }
        if (!upperCase.test(password)) {
            return t('minUpper');
        }
        if (!lowerCase.test(password)) {
            return t('minLower');
        }
        if (!number.test(password)) {
            return t('minNumber');
        }
        if (!specialChar.test(password)) {
            return t('minSpecial');
        }
        return "";
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword));
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError(t('nomatch'));
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setConfirmPasswordError(t('nomatch'));
        } else {
            setConfirmPasswordError("");
        }
    };

    return (
        <div className={style.containerCP}>
            <Helmet>
                <title>{t('changePassword')}</title>
            </Helmet>
            <Card title={t('changePassword')} subTitle={t('enterNPassword')} className={style.changeCard}>
                <div className="flex align-items-center mb-2">
                    <label htmlFor="password" className="mr-2" style={{ minWidth: '150px' }}>{t('newPassword')}</label>
                    <Password id="password" className="flex-grow-1" inputStyle={{ width: '100%' }} value={password} feedback={false} onChange={handlePasswordChange} toggleMask required />
                </div>
                {passwordError && <small className={`${style.textRed} mb-2`}>{passwordError}</small>}
                <div className="flex align-items-center mb-2">
                    <label htmlFor="confirmPassword" className="mr-2" style={{ minWidth: '150px' }}>{t('confirmPassword')}</label>
                    <Password id="confirmPassword" className="flex-grow-1" inputStyle={{ width: '100%' }} value={confirmPassword} feedback={false} onChange={handleConfirmPasswordChange} toggleMask required />
                </div>
                {confirmPasswordError && <small className={`${style.textRed} mb-2`}>{confirmPasswordError}</small>}
                <div className="flex justify-content-between mt-4">
                    <a href="/login"><Button label={t('button.cancel')} className={style.cancelButton} /></a>
                    <a href="/login"><Button label={t('button.confirm')} className={style.confirmButton} disabled={passwordError || confirmPasswordError} /></a>
                </div>
            </Card>
        </div>
    );
}

export default ChangePass;