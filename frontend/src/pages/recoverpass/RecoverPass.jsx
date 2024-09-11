import React from 'react';
import style from './RecoverPass.module.css';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

const RecoverPass = () => {
    const { t } = useTranslation();

    return (
        <div className={style.containerRP}>
            <Helmet>
                <title>{t('recoverPassword')}</title>
            </Helmet>
            <Card title={<div className={style.title}>{t('recoverPassword')}</div>} subTitle={<div className={style.subtitle}>{t('insertMail')}</div>} footer={""} header={""} className={style.recoverCard}>
                <div className={`${style.inputGroup} mb-2`}>
                    <label htmlFor="emailField" className={style.label}>{t('insertMail')}</label>
                    <InputText id="emailField" name="email" className={style.inputField} aria-describedby="username-help" type="email" required />
                </div>
                <div className="flex justify-content-between mt-4">
                    <a href="/login"><Button label={t('button.cancel')} className={style.cancelButton} /></a>
                    <a href="/changepass"><Button label={t('button.confirm')} className={style.confirmButton} /></a>
                </div>
            </Card>
        </div>
    );
}

export default RecoverPass;