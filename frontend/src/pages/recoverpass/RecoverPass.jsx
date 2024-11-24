import React, { useState } from 'react';
import style from './RecoverPass.module.css';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from 'react-i18next';
import PersonService from '../../services/PersonService';
import { useNavigate } from 'react-router-dom';

const RecoverPass = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleRecoverPassword = async () => {
        if (!email) {
            setEmailError(t('Preencha o campo de email'));
            return;
        }

        try {
            await personService.passwordCodeRequest({ email });
            localStorage.setItem('email', email);
            navigate('/changepass');
        } catch (error) {
            setEmailError(t('emailNotFound'));
        }
    };

    return (
        <div className={style.containerRP}>
            <Helmet>
                <title>{t('recoverPassword')}</title>
            </Helmet>
            <Card title={t('recoverPassword')} subTitle={t('insertMail')} className={style.recoverCard}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="emailField" className="flex-grow-1">
                        <InputText id="emailField" name="email" className="flex-grow-1 w-full" value={email} onChange={handleEmailChange} required />
                        <label htmlFor="emailField">{t('insertMail')}</label>
                    </FloatLabel>
                </div>
                {emailError && <small className={style.textRed}>{emailError}</small>}
                <div className={style.buttonGroup}>
                    <Button label={t('button.cancel')} className="m-2" onClick={() => window.location.href = '/login'} />
                    <Button label={t('button.confirm')} className="m-2" onClick={handleRecoverPassword} />
                </div>
            </Card>
        </div>
    );
}

export default RecoverPass;