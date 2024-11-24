import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import style from './NotFound.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={style.containerNF}>
            <Helmet>
                <title>{t('notFound')}</title>
            </Helmet>
            <Card title={t('notFound')} className={style.notFoundCard}>
                <p>{t('error404')}</p>
                <Button label={t('button.home')} className="m-2" onClick={() => navigate('/login')} />
            </Card>
        </div>
    );
}

export default NotFound;