import React, { useEffect, useRef, useState } from 'react'

// prime react icons import
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

// css import
import '../../styles/components/DonneesRefPopUp.scss'


type DonneesRefPopUpProps = {
    donnesRef: string,
    popUpState: boolean,
    setDonneesRef:  React.Dispatch<React.SetStateAction<string>>
    setPopUpState:  React.Dispatch<React.SetStateAction<boolean>>
}

export const DonneesRefPopUp = ({donnesRef, popUpState, setPopUpState, setDonneesRef}: DonneesRefPopUpProps) => {

    const toast = useRef<Toast>(null);
    const deleteToast = useRef<Toast>(null);
    const emptyValueErrorToast = useRef<Toast>(null);

    const [visible, setVisible] = useState(true);
    const [editRefData, setEditRefData] = useState(false)
    const [isEditFormVisible, setEditFormState] = useState(false);
    const [value, setValue] = useState('');
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top');
    // const [position, setPosition] = useState<string>('center');
    const [changesConfirmed, setChangesConfirmed] = useState(false)
    const [toastState, setToastState] = useState(false)

    // state for new donnees referentielles form
    const [newDonneesRefFormState, setNewDonneesRefFormState] = useState(false)

    const [isAddNewDataFormVisible, setAddNewDataFormState] = useState(false)

    const [newDataValue, seNewDataValue] = useState<string>('')


    const footerContent = editRefData ? (
        <div>
            <Button label="Annulez" icon="pi pi-times" onClick={() => {
                setEditFormState(false)
                setEditRefData(false)
            }} className="p-button-text" />
            <Button 
                label="Confirmez" 
                icon="pi pi-check" 
                onClick={() => {
                    setEditFormState(false)
                    setEditRefData(false)
                    showSuccess('Mis a jour effectue')
                }} 
                autoFocus 
            />
        </div>
    ) 
    :
    (
        <div>
            <Button 
            label="Annulez" 
            icon="pi pi-times" 
            onClick={() => {
                setNewDonneesRefFormState(false)
            }} className="p-button-text" />
            <Button 
                label="Confirmez" 
                icon="pi pi-check" 
                onClick={() => {
                    if(!newDataValue.trim()) {
                        toast.current && toast.current.show({severity:'error', summary: 'Erreur', detail:`Le champs ne peut etre vide`, life: 3000});
                        return
                    }
                    setNewDonneesRefFormState(false)
                    showSuccess('Donnee creee avec succes')
                }} 
                autoFocus 
            />
        </div>
    ) 
    ;

    useEffect(() => {
        setTimeout(() => {
            setChangesConfirmed(false)
        }, 4000)
    }, [changesConfirmed])

    const handleAddNewDonneesReferentielle = () => {
        if(!newDataValue.trim()) {
            toast.current && toast.current.show({severity:'error', summary: 'Erreur', detail:`Le champs ne peut etre vide`, life: 3000});
            return
        }
    }


    
    const show = (position: any) => {
        setPosition(position);
        setEditFormState(true);
    };

    const accept = () => {
        deleteToast.current && deleteToast.current.show({ severity: 'info', summary: 'Suppresion reussie', detail: 'Donnees supprimer avec succes', life: 3000 });
    }   

    const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            // reject
        });
    };

    const showSuccess = (details: string) => {
        toast.current && toast.current.show({severity:'success', summary: 'Succes', detail:`${details}`, life: 3000});
        // toast.current && toast.current.show({severity:'success', summary: 'Succes', detail:'Mis a jour effectue', life: 3000});
    }

    return (
        <>
        
            {/* dialog containing form input that edit existing donnees referentielles */}
            {editRefData 
                && 
                <Dialog 
                header="Modification" 
                visible={visible} 
                style={{ width: '30vw' }} 
                onHide={() => {
                    if (!isEditFormVisible) return; setEditFormState(false); setEditRefData(false) 
                }} 
                position={position}
                footer={footerContent}>
                    <InputText 
                        // value={value} 
                        onChange={(e) => 
                        setValue(e.target.value)
                        } 
                        className='w-full outline-none'
                        defaultValue={'1ere Annee Informatique' || value}
                    />
                </Dialog>
            }

            {/* dialog containing form that added new donnees referentielles */}
            {newDonneesRefFormState 
                && 
                <Dialog 
                header="Creer une nouvelle donnee" 
                visible={visible}
                style={{ width: '30vw' }} 
                onHide={() => {
                    if (!newDonneesRefFormState) return; setEditFormState(false); setEditRefData(false); setNewDonneesRefFormState(false)
                }} 
                position={position}
                footer={footerContent}>
                    <InputText 
                        value={newDataValue} 
                        onChange={(e) => 
                            seNewDataValue(e.target.value)
                        } 
                        className='w-full outline-none'
                    />
                </Dialog>
            }

            {/* dialog containing lists of selected donnees referentielles */}
            <Dialog 
                header={`Mise a jour ${donnesRef}`} 
                visible={visible} 
                style={{ width: '50vw' }}
                onHide={() => {if (!visible) return; setVisible(false); setPopUpState(false); setDonneesRef('') }}
            >
                
                <div className="p-0 m-0 popup-container">
                    <div className="flex justify-end btn-wrapper">
                        <span>
                            <Button 
                            // label={`Ajouter une ${donnesRef}`} 
                            label={`Creer`} 
                            icon="pi pi-plus-circle" 
                            iconPos="right" 
                            onClick={() => {
                                setNewDonneesRefFormState(true)
                            }}
                            />
                        </span>
                    </div>
                    <ul className='p-0'>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>Exemple Donnee Referentielle 1</li>
                            <div className="icons-wrapper">
                                <i 
                                className="pi pi-file-edit" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {
                                    setEditRefData(true)
                                    show('top')
                                }}
                                ></i>
                                <i 
                                className="pi pi-trash" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {
                                    confirmDelete()
                                }}
                                >

                                </i>
                            </div>
                        </div>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>Exemple Donnee Referentielle 2</li>
                            <div className="icons-wrapper">
                                <i className="pi pi-file-edit" style={{ fontSize: '1.1rem' }}></i>
                                <i className="pi pi-trash" style={{ fontSize: '1.1rem' }}></i>
                            </div>
                        </div>
                    </ul>
                </div>

            </Dialog>

            {/* {changesConfirmed && <Toast ref={toast} />} */}
            { <Toast ref={toast} />}
            {/* <Toast ref={deleteToast} /> */}
        </>
    )

}