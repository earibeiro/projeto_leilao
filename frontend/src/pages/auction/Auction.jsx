import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useTranslation } from 'react-i18next';
import AuctionService from '../../services/AuctionService';
import CategoryService from '../../services/Categoryservice';
import style from './Auction.module.css';

const Auction = () => {
    const [auctions, setAuctions] = useState([]);
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
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const toast = useRef(null);


    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
        loadAuctions();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.list();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request data:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            toast.current.show({
                severity: 'error',
                summary: t('error.generic'),
                detail: t('category.fetchError'),
            });
        }
    };

    const loadAuctions = async () => {
        setLoading(true);
        try {
            const data = await auctionService.list();
            setAuctions(data);
        } catch (error) {
            console.error('Error fetching auctions:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            toast.current.show({
                severity: 'error',
                summary: t('error.generic'),
                detail: t('auction.fetchError'),
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
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
        setDialogVisible(true);
        setIsEdit(false);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const saveAuction = async () => {
        try {
            if (isEdit) {
                await auctionService.update(auction);
                toast.current.show({ severity: 'success', summary: t('updated'), detail: t('auction.updated') });
            } else {
                await auctionService.insert(auction);
                toast.current.show({ severity: 'success', summary: t('created'), detail: t('auction.created') });
            }
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: t('error.generic'),
                detail: t('auction.saveError'),
            });
        } finally {
            hideDialog();
        }
    };

    const editAuction = (auction) => {
        setAuction({ ...auction });
        setDialogVisible(true);
        setIsEdit(true);
    };

    const confirmDeleteAuction = (auction) => {
        confirmDialog({
            message: `${t('auction.deleteConfirm')} "${auction.title}"?`,
            header: t('confirmation'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteAuction(auction),
        });
    };

    const deleteAuction = async (auction) => {
        try {
            await auctionService.delete(auction.id);
            toast.current.show({ severity: 'warn', summary: t('deleted'), detail: t('auction.deleted') });
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: t('error.generic'),
                detail: t('auction.deleteError'),
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editAuction(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteAuction(rowData)}
                />
            </>
        );
    };

    const dialogFooter = (
        <div>
            <Button label={t('button.cancel')} icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label={t('button.save')} icon="pi pi-check" className="p-button-text" onClick={saveAuction} />
        </div>
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuction({ ...auction, [name]: value });
    };

    const handleDateChange = (name, value) => {
        setAuction({ ...auction, [name]: value });
    };

    return (
        <div className="p-grid p-justify-center h-screen">
            <Helmet>
                <title>{t('auction')}</title>
            </Helmet>
            <Toast ref={toast} />
            <ConfirmDialog acceptLabel={t('yes')} rejectLabel={t('no')} />
            <Button label={t('auction.new')} icon="pi pi-plus" className="p-button-success" onClick={openNew} />
            <DataTable value={auctions} loading={loading}>
                <Column field="title" header={t('title')}></Column>
                <Column field="description" header={t('description')}></Column>
                <Column field="startDateTime" header={t('startDateTime')}></Column>
                <Column field="endDateTime" header={t('endDateTime')}></Column>
                <Column field="status" header={t('status')}></Column>
                <Column body={actionBodyTemplate} header={t('actions')}></Column>
            </DataTable>

            <Dialog
                visible={dialogVisible}
                style={{ width: '50vw' }}
                header={isEdit ? t('auction.edit') : t('auction.new')}
                modal
                footer={dialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="title">{t('title')}</label>
                    <InputText id="title" name="title" value={auction.title} onChange={handleChange} required />
                </div>
                <div className="field">
                    <label htmlFor="description">{t('description')}</label>
                    <InputTextarea id="description" name="description" value={auction.description} onChange={handleChange} rows={3} />
                </div>
                <div className="field">
                    <label htmlFor="startDateTime">{t('startDateTime')}</label>
                    <Calendar id="startDateTime" value={auction.startDateTime} onChange={(e) => handleDateChange('startDateTime', e.value)} showTime />
                </div>
                <div className="field">
                    <label htmlFor="endDateTime">{t('endDateTime')}</label>
                    <Calendar id="endDateTime" value={auction.endDateTime} onChange={(e) => handleDateChange('endDateTime', e.value)} showTime />
                </div>
                <div className="field">
                    <label htmlFor="status">{t('status')}</label>
                    <InputText id="status" name="status" value={auction.status} onChange={handleChange} required />
                </div>
                <div className="field">
                    <label htmlFor="observation">{t('observation')}</label>
                    <InputTextarea id="observation" name="observation" value={auction.observation} onChange={handleChange} rows={3} />
                </div>
                <div className="field">
                    <label htmlFor="incrementValue">{t('incrementValue')}</label>
                    <InputText id="incrementValue" name="incrementValue" value={auction.incrementValue} onChange={handleChange} required />
                </div>
                <div className="field">
                    <label htmlFor="minimumBid">{t('minimumBid')}</label>
                    <InputText id="minimumBid" name="minimumBid" value={auction.minimumBid} onChange={handleChange} required />
                </div>
                <div className="field">
                    <label htmlFor="category">{t('category')}</label>
                    <Dropdown id="category" value={auction.category} options={categories} onChange={(e) => handleChange({ target: { name: 'category', value: e.value } })} optionLabel="name" placeholder={t('selectCategory')} />
                </div>
            </Dialog>
        </div>
    );
};

export default Auction;