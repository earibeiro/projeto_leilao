import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import style from './ValidationSuccess.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ValidationSuccess = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={style.containerVS}>
            <Helmet>
                <title>{t('emailValidationSuccess')}</title>
            </Helmet>
            <Card title={t('emailValidationSuccess')} className={style.successCard}>
                <p>{t('redirectlogin')}</p>
            </Card>
        </div>
    );
}

export default ValidationSuccess;