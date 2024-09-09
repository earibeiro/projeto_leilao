import React from 'react';
import style from './RecoverPass.module.css';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

const RecoverPass = () => {
    const {t} = useTranslation();

    return (
        <div className={style.containerRP}>
            <Helmet>
                <title>{t('recoverPassword')}</title>
            </Helmet>
            <Card title={t('recoverPassword')} subTitle={t('insertMail')} footer={""} header={""} className={style.recoverCard}>
                <label htmlFor="emailField" className="mb-1">{t('insertMail')} </label>
                <InputText inputStyle={{ width: '100%' }} className={style.inputField} aria-describedby="username-help" type="email" required/>
                <a href="/login"><Button label="Cancelar" className={style.cancelButton} /></a>
                <a href="/changepass"><Button label="Confirmar" className={style.confirmButton} /></a>
            </Card>
        </div>
    );
}

export default RecoverPass;