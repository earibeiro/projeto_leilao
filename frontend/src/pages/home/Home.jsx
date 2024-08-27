import React, { useRef } from "react";
import style from "./Home.module.css";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";


const Home = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div>
            <Helmet>
                <title>Página Inicial</title>
            </Helmet>
            <h1 className={`h-screen flex justify-content-center ${style.textColor}`}>Seja {t('welcome')} à Página Inicial</h1>
            <button onClick={()=>changeLanguage('en')}>English</button>
            <button onClick={()=>changeLanguage('pt-BR')}>Português</button>
        </div>
    );
}

export default Home;