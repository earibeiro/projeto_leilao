import React, { useRef } from "react";
import "./Home.css";
import { Helmet } from 'react-helmet';
import Logout from "../../components/logout/logout";


const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Página Inicial</title>
            </Helmet>
            
            <Logout/>
        </div>
    );
}

export default Home;