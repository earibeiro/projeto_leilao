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
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cepError, setCepError] = useState('');
    const [image, setImage] = useState(null); // Adicionei o estado para a imagem

    const handleCpfChange = (e) => {
        const newCpf = e.target.value;
        setCpf(newCpf);

        if (cpfValidator.isValid(newCpf)) {
            setCpfError('');
        } else {
            setCpfError('CPF inválido');
        }
    };

    const handleCepChange = async (e) => {
        const newCep = e.target.value;
        setCep(newCep);

        if (newCep.length === 9) { // Verifica se o CEP está completo
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
        <div>
            <Helmet>
                <title>Perfil</title>
            </Helmet>
            <div className="card justify-content-center">
                <label htmlFor="profilePicture">Foto de Perfil: </label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                <label htmlFor="username">Nome Completo </label> 
                <InputText inputStyle={{ width: '100%' }} className="w-5 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="emailField">E-mail </label> 
                <InputText inputStyle={{ width: '100%' }} className="w-5 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="calendar" className="pr-1">Data de Nascimento: </label>
                <Calendar dateFormat="dd/mm/yy" value={date} onChange={(e) => setDate(e.value)} />
                <label htmlFor="phone">Telefone: </label>
                <InputMask value={value} onChange={(e) => setValue(e.target.value)} mask="(99) 99999-9999" placeholder="(00) 00000-0000"/>
                <label htmlFor="cpf">CPF: </label>
                <div style={{ position: 'relative' }}>
                    <InputMask value={cpf} onChange={handleCpfChange} mask="999.999.999-99" placeholder="000.000.000-00"/>
                    {cpfError && <small className="error-message">{cpfError}</small>}
                </div>
                <label htmlFor="zipCode">CEP: </label>
                <InputMask value={cep} onChange={handleCepChange} mask="99999-999" placeholder="00000-000"/>
                {cepError && <small className="p-error">{cepError}</small>}
                <label htmlFor="address">Endereço: </label> 
                <InputText value={address} onChange={(e) => setAddress(e.target.value)} inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressNeighborhood">Bairro: </label> 
                <InputText value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressCity">Cidade: </label> 
                <InputText value={city} onChange={(e) => setCity(e.target.value)} inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressState">Estado: </label> 
                <InputText value={state} onChange={(e) => setState(e.target.value)} inputStyle={{ width: '100%' }} className="w-3 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressNumber">Número: </label> 
                <InputText inputStyle={{ width: '100%' }} className="w-1 mb-3" aria-describedby="username-help" required/>
                <label htmlFor="addressComplement">Complemento: </label> 
                <InputText inputStyle={{ width: '100%' }} className="w-2 mb-3" aria-describedby="username-help" required/>
            </div>
        </div>
    );
}

export default Profile;