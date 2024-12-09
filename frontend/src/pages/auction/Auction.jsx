import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import style from './Auction.module.css';

const Auction = () => {
    const [auction, setAuction] = useState({
        title: '',
        description: '',
        startDateTime: null,
        endDateTime: null,
        status: '',
        observation: '',
        incrementValue: '',
        minimumBid: '',
        category: null
    });
    const [categories, setCategories] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get('/api/category')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuction({ ...auction, [name]: value });
    };

    const handleDateChange = (name, value) => {
        setAuction({ ...auction, [name]: value });
    };

    const handleSubmit = () => {
        axios.post('/api/auction', auction)
            .then(response => {
                console.log('Auction created:', response.data);
                setAuction({
                    title: '',
                    description: '',
                    startDateTime: null,
                    endDateTime: null,
                    status: '',
                    observation: '',
                    incrementValue: '',
                    minimumBid: '',
                    category: null
                });
            })
            .catch(error => console.error('Error creating auction:', error));
    };

    return (
        <div className={style.containerAuction}>
            <Helmet>
                <title>{t('auction')}</title>
            </Helmet>
            <Card title={t('auction')} className={style.auctionCard}>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="title" className="flex-grow-1">
                        <InputText id="title" name="title" value={auction.title} onChange={handleChange} className="flex-grow-1 w-full" required />
                        <label htmlFor="title">{t('title')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="description" className="flex-grow-1">
                        <InputTextarea id="description" name="description" value={auction.description} onChange={handleChange} className="flex-grow-1 w-full" rows={3} />
                        <label htmlFor="description">{t('description')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <label htmlFor="startDateTime" className="pr-1">{t('startDateTime')}</label>
                    <Calendar id="startDateTime" value={auction.startDateTime} onChange={(e) => handleDateChange('startDateTime', e.value)} showTime />
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <label htmlFor="endDateTime" className="pr-1">{t('endDateTime')}</label>
                    <Calendar id="endDateTime" value={auction.endDateTime} onChange={(e) => handleDateChange('endDateTime', e.value)} showTime />
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="status" className="flex-grow-1">
                        <InputText id="status" name="status" value={auction.status} onChange={handleChange} className="flex-grow-1 w-full" required />
                        <label htmlFor="status">{t('status')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="observation" className="flex-grow-1">
                        <InputTextarea id="observation" name="observation" value={auction.observation} onChange={handleChange} className="flex-grow-1 w-full" rows={3} />
                        <label htmlFor="observation">{t('observation')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="incrementValue" className="flex-grow-1">
                        <InputText id="incrementValue" name="incrementValue" value={auction.incrementValue} onChange={handleChange} className="flex-grow-1 w-full" required />
                        <label htmlFor="incrementValue">{t('incrementValue')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <FloatLabel htmlFor="minimumBid" className="flex-grow-1">
                        <InputText id="minimumBid" name="minimumBid" value={auction.minimumBid} onChange={handleChange} className="flex-grow-1 w-full" required />
                        <label htmlFor="minimumBid">{t('minimumBid')}</label>
                    </FloatLabel>
                </div>
                <div className="flex align-items-center m-2 mb-5">
                    <label htmlFor="category" className="pr-1">{t('category')}</label>
                    <Dropdown id="category" value={auction.category} options={categories} onChange={(e) => handleChange({ target: { name: 'category', value: e.value } })} optionLabel="name" placeholder={t('selectCategory')} />
                </div>
                <div className={style.buttonGroup}>
                    <Button label={t('button.save')} onClick={handleSubmit} className="m-2" />
                </div>
            </Card>
        </div>
    );
};

export default Auction;