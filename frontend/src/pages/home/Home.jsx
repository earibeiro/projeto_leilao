import React, { useRef } from "react";
import "./Home.css";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";


const Home = () => {
    const {t} = useTranslation();

    return (
        <div>
            <Helmet>
                <title>Página Inicial</title>
            </Helmet>
            <h1>Seja {t('welcome')} Página Inicial</h1>
        </div>
    );
}

export default Home;