import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import style from './SignupValidation.module.css';
import { useTranslation } from 'react-i18next';
import PersonService from '../../services/PersonService';
import { useNavigate } from 'react-router-dom';

const SignupValidation = () => {
    const [code, setCode] = useState('');
    const [validationCodeError, setValidationCodeError] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleValidationCodeChange = (e) => {
        setCode(e.target.value);
        setValidationCodeError('');
    };

    const handleValidateEmail = async () => {
        if (!code) {
            setValidationCodeError(t('allFieldsRequired'));
            return;
        }

        try {
            await personService.validateEmail({ code });
            alert(t('emailValidationSuccess'));
            navigate('/validationsuccess');
        } catch (error) {
            console.error(error);
            setValidationCodeError(t('emailValidationError'));
        }
    };

    return (
        <div className={style.containerSV}>
            <Helmet>
                <title>{t('validateEmail')}</title>
            </Helmet>
            <Card title={t('validateEmail')} subTitle={t('enterValidationCode')} className={style.validationCard}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="validationCode" className="flex-grow-1">
                        <InputText id="validationCode" name="validationCode" className="flex-grow-1 w-full" value={code} onChange={handleValidationCodeChange} required />
                        <label htmlFor="validationCode">{t('validationCode')}</label>
                    </FloatLabel>
                </div>
                {validationCodeError && <small className={style.textRed}>{validationCodeError}</small>}
                <div className={style.buttonGroup}>
                    <Button label={t('button.cancel')} className="m-2" onClick={() => navigate('/login')} />
                    <Button label={t('button.confirm')} className="m-2" onClick={handleValidateEmail} />
                </div>
            </Card>
        </div>
    );
}

export default SignupValidation;