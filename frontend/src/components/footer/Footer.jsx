import React from "react";
import style from "./Footer.module.css";
import { useTranslation} from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return(
        <div className="footer">
            <div class={style.grid}>
                <div class={style.sections}>
                    <div class={style.textLeft}>
                    <ul className={style.fontBold}>{t('auctions')}</ul>
                        <ul onClick={() => navigate('/auction')} style={{ cursor: 'pointer' }}>{t('ongoingAuctions')}</ul>
                        <ul>{t('closedAuctions')}</ul>
                        <ul>{t('scheduledAuctions')}</ul>
                    </div>
                    <div className={style.textLeft}>
                        <ul className={style.fontBold}>{t('company')}</ul>
                        <ul>{t('aboutUs')}</ul>
                        <ul>{t('team')}</ul>
                        <ul>{t('careers')}</ul>
                    </div>
                    <div class={style.textLeft}>
                        <ul class={style.fontBold}>{t('contact')}</ul>
                        <ul>{t('helpnSup')}</ul>
                        <ul>{t('faq')}</ul>
                        <ul>{t('contactUs')}</ul>
                    </div>
                    <div className={style.footerText}>
                        <p>{t('footerText')}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Footer;