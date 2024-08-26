import React from "react";
import "./Footer.css";

const Footer = () => {
    return(
        <div className="footer">
            <div class="grid">
                <div class="col sm:p-3 flex flex-row flex-wrap align-items-center justify-content-center">
                    <div class="text-left p-3">
                        <ul class="font-bold">Leilões</ul>
                        <ul>Como funciona</ul>
                        <ul>Leilões em andamento</ul>
                        <ul>Leilões encerrados</ul>
                        <ul>Leilões agendados</ul>
                    </div>
                    <div class="text-left p-3">
                        <ul class="font-bold">Empresa</ul>
                        <ul>Quem somos</ul>
                        <ul>Equipe</ul>
                        <ul>Trabalhe conosco</ul>
                    </div>
                    <div class="text-left p-3">
                        <ul class="font-bold">Contato</ul>
                        <ul>Ajuda e suporte</ul>
                        <ul>FAQ</ul>
                        <ul>Entre em contato conosco</ul>
                    </div>
                </div>
            </div>
            
            <p>&copy; 2024</p>
        </div>
    );
}
export default Footer;