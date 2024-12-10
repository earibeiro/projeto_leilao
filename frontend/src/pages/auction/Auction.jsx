import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
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
import auctionService from '../../services/AuctionService';
import categoryService from '../../services/Categoryservice';
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

    useEffect(() => {
        loadCategories();
        loadAuctions();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.list();
            setCategories(data);
        } catch (error) {
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
                    <InputText id="title" name="title" value={auction.title} onChange={(e) => setAuction({ ...auction, name: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="description">{t('description')}</label>
                    <InputTextarea id="description" name="description" value={auction.description} onChange={(e) => setAuction({ ...auction, description: e.target.value })} rows={3} />
                </div>
                <div className="field">
                    <label htmlFor="startDateTime">{t('startDateTime')}</label>
                    <Calendar id="startDateTime" value={auction.startDateTime} onChange={setAuction} showTime />
                </div>
                <div className="field">
                    <label htmlFor="endDateTime">{t('endDateTime')}</label>
                    <Calendar id="endDateTime" value={auction.endDateTime} onChange={setAuction} showTime />
                </div>
                <div className="field">
                    <label htmlFor="status">{t('status')}</label>
                    <InputText id="status" name="status" value={auction.status} onChange={(e) => setAuction({ ...auction, status: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="observation">{t('observation')}</label>
                    <InputTextarea id="observation" name="observation" value={auction.observation} onChange={(e) => setAuction({ ...auction, observation: e.target.value })} rows={3} />
                </div>
                <div className="field">
                    <label htmlFor="incrementValue">{t('incrementValue')}</label>
                    <InputText id="incrementValue" name="incrementValue" value={auction.incrementValue} onChange={(e) => setAuction({ ...auction, incrementValue: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="minimumBid">{t('minimumBid')}</label>
                    <InputText id="minimumBid" name="minimumBid" value={auction.minimumBid} onChange={(e) => setAuction({ ...auction, minimumBid: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="category">{t('category')}</label>
                    <Dropdown id="category" value={auction.category} options={categories} onChange />
                </div>
            </Dialog>
        </div>
    );
};

export default Auction;