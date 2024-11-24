import React, { useState } from 'react';
import style from './Profile.module.css';
import { Helmet } from 'react-helmet';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { useTranslation } from 'react-i18next';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';

const Profile = () => {
    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cepError, setCepError] = useState('');
    const [image, setImage] = useState(null);
    const { t } = useTranslation();

    const handleCpfChange = (e) => {
        const newCpf = e.target.value;
        setCpf(newCpf);

        if (cpfValidator.isValid(newCpf)) {
            setCpfError('');
        } else {
            setCpfError(t('invalidCpf'));
        }
    };

    const handleCepChange = async (e) => {
        const newCep = e.target.value;
        setCep(newCep);

        if (newCep.length === 9) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${newCep.replace('-', '')}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setCepError('CEP inválido');
                    setAddress('');
                    setNeighborhood('');
                    setCity('');
                    setState('');
                } else {
                    setCepError('');
                    setAddress(data.logradouro);
                    setNeighborhood(data.bairro);
                    setCity(data.localidade);
                    setState(data.uf);
                }
            } catch (error) {
                setCepError('Erro ao buscar CEP');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={style.containerProfile}>
            <Helmet>
                <title>{t('profile')}</title>
            </Helmet>
            <h1>{t('profile')}</h1>
            <div className="flex align-items-center m-2 mb-5">
                <label htmlFor="profilePicture">{t('profPicture')}</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
            </div>
            <div className={style.gridContainer}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="username" className="flex-grow-1">
                        <InputText id="username" name="username" className="flex-grow-1 w-full" required />
                        <label htmlFor="username">{t('fullName')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="emailField" className="flex-grow-1">
                        <InputText id="emailField" name="email" className="flex-grow-1 w-full" required />
                        <label htmlFor="emailField">{t('email')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="birthdate" className="flex-grow-1">
                        <InputMask id="birthdate" value={date} onChange={(e) => setDate(e.target.value)} mask="99/99/9999" placeholder="dd/mm/yyyy" />
                        <label htmlFor="birthdate">{t('birthDate')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="phone" className="flex-grow-1">
                        <InputMask id="phone" value={value} onChange={(e) => setValue(e.target.value)} mask="(99) 99999-9999" placeholder="(00) 00000-0000" />
                        <label htmlFor="phone">{t('phone')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="cpf" className="flex-grow-1">
                        <InputMask id="cpf" value={cpf} onChange={handleCpfChange} mask="999.999.999-99" placeholder="000.000.000-00" />
                        <label htmlFor="cpf">{t('cpf')}</label>
                        {cpfError && <small className={style.textRed}>{cpfError}</small>}
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="zipCode" className="flex-grow-1">
                        <InputMask id="zipCode" value={cep} onChange={handleCepChange} mask="99999-999" placeholder="00000-000" />
                        <label htmlFor="zipCode">{t('zipCode')}</label>
                        {cepError && <small className={style.textRed}>{cepError}</small>}
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="address" className="flex-grow-1">
                        <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="flex-grow-1 w-full" required />
                        <label htmlFor="address">{t('address')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="neighborhood" className="flex-grow-1">
                        <InputText id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="flex-grow-1 w-full" required />
                        <label htmlFor="neighborhood">{t('neighborhood')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="city" className="flex-grow-1">
                        <InputText id="city" value={city} onChange={(e) => setCity(e.target.value)} className="flex-grow-1 w-full" required />
                        <label htmlFor="city">{t('city')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="state" className="flex-grow-1">
                        <InputText id="state" value={state} onChange={(e) => setState(e.target.value)} className="flex-grow-1 w-full" required />
                        <label htmlFor="state">{t('state')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="addressNumber" className="flex-grow-1">
                        <InputText id="addressNumber" className="flex-grow-1 w-full" required />
                        <label htmlFor="addressNumber">{t('houseNumber')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="addressComplement" className="flex-grow-1">
                        <InputText id="addressComplement" className="flex-grow-1 w-full" />
                        <label htmlFor="addressComplement">{t('complement')}</label>
                    </FloatLabel>
                </div>
            </div>
            <div className={style.buttonGroup}>
                <Button label={t('button.save')} className="m-2" />
            </div>
        </div>
    );
}

export default Profile;