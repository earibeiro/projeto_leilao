import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import style from './Unauthorized.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={style.containerUA}>
            <Helmet>
                <title>{t('unauthorized')}</title>
            </Helmet>
            <Card title={t('unauthorized')} className={style.unauthorizedCard}>
                <p>{t('error401')}</p>
                <Button label={t('button.home')} className="m-2" onClick={() => navigate('/login')} />
            </Card>
        </div>
    );
}

export default Unauthorized;