import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import "./Header.css";
import Logout from "../../components/logout/logout";

const Header = () => {
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const [showLogout, setShowLogout] = useState(false);
    const items = [
        {
            label: 'Opções',
            items: [
                {
                    label: 'Início',
                    icon: 'pi pi-fw pi-home',
                    command: () => {
                        window.location.href = '/';
                    }
                },
                {
                    label: 'Leilões em andamento',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Meus lances',
                    icon: 'pi pi-money-bill'
                },
                {
                    label: 'Meus leilões',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Perfil',
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        window.location.href = '/perfil';
                    }
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-fw pi-power-off',
                    command: () => {
                        setShowLogout(true);
                    }
                }
            ]
        }
    ];



    return(
        <div className="header">
            <div className="card flex justify-content-center">
                <Toast ref={toast} />
                <Menu model={items} popup ref={menuLeft} id="popup_menu" />
                <Button label="Show Left" icon="pi pi-align-left" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                {showLogout && <Logout />}
            </div>
        </div>
    );
}
export default Header;