import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import style from "./Header.module.css";
import Logout from "../../components/logout/logout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const items = [
        {
            label: 'Opções',
            items: [
                {
                    label: t('home'),
                    icon: 'pi pi-fw pi-home',
                    command: () => {
                        window.location.href = '/';
                    }
                },
                {
                    label: t('ongoingAuctions'),
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: t('auctionsMyBids'),
                    icon: 'pi pi-money-bill'
                },
                {
                    label: t('auctionsMyAuctions'),
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: t('profile'),
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        window.location.href = '/profile';
                    }
                },
                {
                    label: t('logout'),
                    icon: 'pi pi-fw pi-power-off',
                    command: () => {
                        Logout();
                        navigate('/login');
                    }
                }
            ]
        }
    ];



    return(
        <div className={style.header}>
            <div className="left justify-content-center">
                <Toast ref={toast} />
                <Menu model={items} popup ref={menuLeft} id="popup_menu" />
                <Button label="Menu" icon="pi pi-align-left" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
            </div>
        </div>
    );
}
export default Header;