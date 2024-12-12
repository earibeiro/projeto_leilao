import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import style from "./Header.module.css";
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
                        navigate('/');
                    }
                },
                {
                    label: t('auction'),
                    icon: 'pi pi-fw pi-list',
                    command: () => {
                        navigate('/auction');
                    }
                },
                {
                    label: t('category'),
                    icon: 'pi pi-money-bill',
                    command: () => {
                        navigate('/category');
                    }
                },
                {
                    label: t('profile'),
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        navigate('/profile');
                    }
                },
                {
                    label: t('logout'),
                    icon: 'pi pi-fw pi-power-off',
                    command: () => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate('/login');
                    }
                }
            ]
        }
    ];



    return(
        <div className={style.header}>
            <div className={style.menu}>
                <Toast ref={toast} />
                <Menu model={items} popup ref={menuLeft} id="popup_menu" />
                <Button label="Menu" icon="pi pi-align-left" className={`${style.menuButton} mr-2`} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
            </div>
        </div>
    );
}
export default Header;