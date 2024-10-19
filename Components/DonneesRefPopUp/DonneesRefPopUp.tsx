import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ProductService } from '../../demo/service/ProductService';
// import { ProductService } from '../../../../demo/service/ProductService';


// prime react icons import
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';


// css import
import '../../styles/components/DonneesRefPopUp.scss'
import { TableData } from '../DataTable/DataTable';
import axios from 'axios';
import { cp } from 'fs';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}


type DonneesRefPopUpProps = {
    donnesRef: string,
    popUpState: boolean,
    setDonneesRef:  React.Dispatch<React.SetStateAction<string>>
    setPopUpState:  React.Dispatch<React.SetStateAction<boolean>>
}

// type ProductList = {
//     code: string;
//     lib: string;
// }

// type updatedList = ProductList & {edit: JSX.Element}

type fetchedDonneesRefsDataStructure = {
    aacCode: number
    aacCreerPar: string,
    aacLib: string,
    aacModifierPar: string, 
    aacStatus: boolean 
}

enum typeOfDataFetchedEnums {
    CodeAndLibType = 'CodeAndLib',
    AnneeAcademiqueType = 'AnneeAcademiqueType',
    RubriqueType = 'RubriqueType',
}


export const DonneesRefPopUp = ({donnesRef, popUpState, setPopUpState, setDonneesRef}: DonneesRefPopUpProps) => {

    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL

    const toast = useRef<Toast>(null);
    const deleteToast = useRef<Toast>(null);
    const emptyValueErrorToast = useRef<Toast>(null);

    const [visible, setVisible] = useState(true);
    const [editRefData, setEditRefData] = useState(false)
    const [isEditFormVisible, setEditFormState] = useState(false);
    const [value, setValue] = useState<string>('');
    const [updatedValue, setUpdatedValue] = useState<string>('');
    const [updatedDataCode, setUpdatedDataCode] = useState<number | null>(null);
    const [selectedDataCode, setSelectedDataCode] = useState<number | null>(null);
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top');
    // const [position, setPosition] = useState<string>('center');
    const [changesConfirmed, setChangesConfirmed] = useState(false)
    const [toastState, setToastState] = useState(false)

    const [fetchedDonneesRefsData, setFetchedDonneesRefsData] = useState<fetchedDonneesRefsDataStructure[]>([])

    const [typeOfDataFetched, setTypeOfDataFetched] = useState('');

    const [checked, setChecked] = useState<boolean>(false);


    // fonction ajoutant les nouvelles donnees referentielles
    const handleAddNewDonneesRef = () => {}
    
    // fonction en charge de la recuperation des donnees referentielles existantes
    const handleGetDonneesRef = () => {}

    const [products, setProducts] = useState([
        {
            code: '001',
            lib: '1ere Annee Informatique'
        },
        {
            code: '002',
            lib: 'Exemple 2'
        },
        {
            code: '003',
            lib: 'Exemple 3'
        },
        {
            code: '004',
            lib: 'Exemple 4'
        },

    ]);

    // state for new donnees referentielles form
    const [newDonneesRefFormState, setNewDonneesRefFormState] = useState(false)

    const [isAddNewDataFormVisible, setAddNewDataFormState] = useState(false)

    const [newDataValue, seNewDataValue] = useState<string>('')

    const footerContent = isEditFormVisible ? (
        <div>
            <Button label="Annulez" icon="pi pi-times" onClick={() => {
                setEditFormState(false)
                setEditRefData(false)
            }} className="p-button-text" />
            <Button 
                label="Confirmez" 
                icon="pi pi-check" 
                onClick={() => {
                    updateAnneeAcademiqueData()
                    setEditFormState(false) 
                    setEditRefData(false)
                    showSuccess('Mise à jour effectuée')
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
                        toast.current && toast.current.show({severity:'error', summary: 'Erreur', detail:`Le champs ne peut être vide`, life: 3000});
                        return;
                    }
                    addNewDonneesReferentielles()
                    showSuccess('Donnée créée avec succes')
                    seNewDataValue('')
                    setNewDonneesRefFormState(false)
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

        deleteDonneesReferentiellesData()

        deleteToast.current 
        && 
        deleteToast.current.show({ severity: 'info', summary: 'Suppresion reussie', detail: 'Données supprimer avec succes', life: 3000 });
    }   


    const confirmDelete = () => {
        confirmDialog({
            message: 'Êtes vous sûre de vouloir supprimer cette donnée?',
            header: 'Confirmez la suppression',
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

    // function qui se charge de fetch toutes les annee academiques
    const fetchingAnneeAnneeAcademiqueData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/anneeAcademique')

            console.log(response.data)
            if(response.status === 200) {
                setFetchedDonneesRefsData(response.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la creation des annees academique
    const submitAnneeAcademiqueData = async () => {

        let dataToBeSubmitted = {
            aacLib: newDataValue,
            aacCreerPar: "yannickwnz",
            aacStatus: false
        }

        try {
            
            const response = await axios.post('http://localhost:8080/api/anneeAcademique', dataToBeSubmitted)

            console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la mise a jour des annees academique
    const updateAnneeAcademiqueData = async () => {

        if(updatedDataCode === null) return;

        let dataToBeSubmitted = {
            aacLib: updatedValue,
            aacCreerPar: "yannickwnz",
            aacStatus: false
        }

        try {
            
            const response = await axios.put(`http://localhost:8080/api/anneeAcademique/${updatedDataCode}`, dataToBeSubmitted)

            console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
            }

        } catch (error) {
            console.log(error)
        }

    }

    // fetching data
    const fetchingDonnessReferentielles = async () => {

        switch (donnesRef) {
            case "Annee Academique":
                setTypeOfDataFetched(typeOfDataFetchedEnums.AnneeAcademiqueType);
                fetchingAnneeAnneeAcademiqueData()       
                break;
        
            default:
                break;
        }

    }

    // function qui se charge de la creation de nouvelles donnees referentielles 
    const addNewDonneesReferentielles = async () => {

        switch (donnesRef) {
            case "Annee Academique":
                submitAnneeAcademiqueData()
                break;
        
            default:
                break;
        }

    }

    const deleteDonneesReferentiellesData = async () => {

        if(selectedDataCode === null) return;
        
        try {
            
            const response = await axios.delete(`http://localhost:8080/api/anneeAcademique/${selectedDataCode}`)

            console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
                setSelectedDataCode(null)
            }

        } catch (error) {
            console.log(error)
            setSelectedDataCode(null)
        }

    }

    useEffect(() => {
        fetchingDonnessReferentielles()
    }, [donnesRef])


    return (
        <>

        
            {/* dialog containing form input that edit existing donnees referentielles */}
            {isEditFormVisible
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
                            {
                                // setValue(e.target.value)
                                setUpdatedValue(e.target.value)
                            }
                        } 
                        className='w-full outline-none'
                        // defaultValue={'1ere Annee Informatique' || value}
                        // defaultValue={value}
                        defaultValue={updatedValue}
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
                onHide={() => {if (!visible) return; setVisible(false); setPopUpState(false); setDonneesRef(''); setTypeOfDataFetched('');  }}
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

                    <div className="">
                        {typeOfDataFetched === typeOfDataFetchedEnums.CodeAndLibType && <TableData 
                            data={products}
                            isEditFormVisible={isEditFormVisible}
                            setEditFormState={setEditFormState}
                            functionSettingEditFormPosition={show}
                            functionSettingEditFormInputValue={setValue}
                        />}

                        
            

                    </div>
                    {typeOfDataFetched === typeOfDataFetchedEnums.AnneeAcademiqueType && <div>
                        {fetchedDonneesRefsData.length > 0 ? <div className='table-wrapper'>
                                <table>
                                    <th>Code</th>
                                    <th>Lib</th>
                                    <th>Status</th>
                                    <th></th>
                                    { fetchedDonneesRefsData?.map(data => {
                                        return (
                                            <tr className='font-bold' key={data.aacCode}>
                                                <td>{data.aacCode}</td>
                                                <td>{data.aacLib}</td>
                                                <td>

                                                    <ToggleButton 
                                                        onLabel="Actif" 
                                                        offLabel="Non actif" 
                                                        onIcon="pi pi-check" 
                                                        offIcon="pi pi-times" 
                                                        checked={data.aacStatus ? true : false}
                                                        onChange={(e:  ToggleButtonChangeEvent) => setChecked(e.value)} 
                                                        className={`w-9rem h-2rem ${data.aacStatus && 'activeStatus'} `}
                                                    />

                                                </td>
                                                <td>
                                                    <div className="icons-wrapper">
                                                        <i
                                                            className="pi pi-file-edit"
                                                            style={{ fontSize: '1.2rem', marginRight: '1rem' }}
                                                            onClick={() => {
                                                                setEditFormState(true)
                                                                setUpdatedValue(data.aacLib)
                                                                setUpdatedDataCode(data.aacCode)
                                                            }}
                                                        ></i>
                                                        <i
                                                            className="pi pi-trash"
                                                            style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                                            onClick={() => {
                                                                confirmDelete()
                                                                setSelectedDataCode(data.aacCode)
                                                            }}
                                                        >
                                                        </i>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                        
                                    })}
                                </table>
                            </div>
                            :
                            <div className='w-full text-center font-bold mt-4 flex' style={{ justifyContent: "center" }}>
                                <p style={{ maxWidth: "70%" }} className='border-4'>Aucune Promotion créée. Cliquez sur creer pour ajouter une promotion</p>
                            </div>
                        }
                    </div>}
                    
                </div>

            </Dialog>

            {/* {changesConfirmed && <Toast ref={toast} />} */}
            { <Toast ref={toast} />}
            <Toast ref={deleteToast} />
        </>
    )

}