import React, { useState } from 'react';
import './Profile.css';
import { Helmet } from 'react-helmet';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

const Profile = () => {
    const [date, setDate] = useState(null);
    const [value, setValue] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');

    const handleCpfChange = (e) => {
        const newCpf = e.target.value;
        setCpf(newCpf);

        if (cpfValidator.isValid(newCpf)) {
            setCpfError('');
        } else {
            setCpfError('CPF inválido');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Perfil</title>
            </Helmet>
            <div className="card justify-content-center">
                <label htmlFor="username">Nome Completo </label> <InputText inputStyle={{ width: '100%' }} className="w-5 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="emailField">E-mail </label> <InputText inputStyle={{ width: '100%' }} className="w-5 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="calendar" className="pr-1">Data de Nascimento: </label><Calendar dateFormat="dd/mm/yy" value={date} onChange={(e) => setDate(e.value)} />
                <label htmlFor="phone">Telefone: </label><InputMask value={value} onChange={(e) => setValue(e.target.value)} mask="(99) 99999-9999" placeholder="(00) 00000-0000"/>
                <label htmlFor="cpf">CPF: </label><InputMask value={cpf} onChange={handleCpfChange} mask="999.999.999-99" placeholder="000.000.000-00"/>
                {cpfError && <small className="p-error">{cpfError} </small>}
                <label htmlFor="zipCode">CEP: </label><InputMask value={value} onChange={(e) => setValue(e.target.value)} mask="99999-999" placeholder="00000-000"/>
                <label htmlFor="address">Endereço: </label> <InputText inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressNeighborhood">Bairro: </label> <InputText inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressNumber">Número: </label> <InputText inputStyle={{ width: '100%' }} className="w-1 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressComplement">Complemento: </label> <InputText inputStyle={{ width: '100%' }} className="w-2 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressCity">Cidade: </label> <InputText inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressState">Estado: </label> <InputText inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
            </div>
        </div>
    );
}

export default Profile;