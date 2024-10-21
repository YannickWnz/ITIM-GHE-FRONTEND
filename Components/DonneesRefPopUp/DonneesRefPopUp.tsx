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
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
        

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
    aacStatus: boolean,
    proCode: number,
    proLib: string
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
    const updateStatusToast = useRef<Toast>(null);
    const emptyValueErrorToast = useRef<Toast>(null);

    const headlessToast = useRef<Toast>(null);


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

    const [fetchedDonneesRefsData, setFetchedDonneesRefsData] = useState<fetchedDonneesRefsDataStructure[]>([])

    const [typeOfDataFetched, setTypeOfDataFetched] = useState('');

    const [checked, setChecked] = useState<boolean>(false);

    const [isDataBeingDeleted, setIsDataBeingDeleted] = useState(false)

    const [confirmationDialogVisibility, setConfirmationDialogVisibility] = useState<boolean>(false)
    const [confirmationDialogMessage, setConfirmationDialogMessage] = useState<string>('')

    const [selectedAnneeAcademiqueCode, setSelectedAnneeAcademiqueCode] = useState<number | null>(null)
    const [fetchedPromotionAnneeAcademique, setFetchedPromotionAnneeAcademique] = useState<fetchedDonneesRefsDataStructure[]>([])

    // const [selectedAnneeAcademiqueCode, setSelectedAnneeAcademiqueCode] = useState<number | null>(null)

    const [selectedDonneesRefLib, setSelectedDonneesRefLib] = useState('');
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const [updateStatusData, setUpdateStatusData] = useState({
        newStatus: false,
        aacCode: 0
    })

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

    const [newDataValue, seNewDataValue] = useState<string>('')

    // montrer les messages selon si les donnees ont ete modifier ou ajouter
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
                    if(donnesRef === "Annee Academique") {
                        updateAnneeAcademiqueData()
                    }
                    else if(donnesRef === "Promotion") {
                        updataPromotionData()
                    }
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
                seNewDataValue('')
            }} className="p-button-text" />
            <Button 
                label="Confirmez" 
                icon="pi pi-check" 
                onClick={() => {
                    if(!newDataValue.trim()) {
                        toast.current && toast.current.show({severity:'error', summary: 'Erreur', detail:`Le champs ne peut être vide`, life: 3000});
                        return;
                    }
                    if(donnesRef === "Promotion" && (!selectedAnneeAcademiqueCode || selectedAnneeAcademiqueCode === null)) {
                        toast.current && toast.current.show({severity:'error', summary: 'Erreur', detail:`Veuillez selectionner une annee academique`, life: 3000});
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

    const confirmDialogFooterContent = (
        <div>
            <Button label="Annuler" icon="pi pi-times" onClick={() => {
                setConfirmationDialogVisibility(false); 
                setIsDataBeingDeleted(false)
            }} className="p-button-text" />
            <Button 
            label="Confirmer" 
            icon="pi pi-check" 
            onClick={() => {
                if(isDataBeingDeleted) {
                    if(donnesRef === "Annee Academique") {
                        deleteDonneesReferentiellesData()
                    } else if (donnesRef === "Promotion") {
                        deletePromotionData()
                    }
                    setConfirmationDialogVisibility(false)
                    setIsDataBeingDeleted(false)
                    return
                } 
                if(!isDataBeingDeleted) {
                    handleAnneeAcademiqueStatusChange()
                    setConfirmationDialogVisibility(false)
                    setIsDataBeingDeleted(false)
                }
                setIsDataBeingDeleted(false)
            }} 
            autoFocus 
            />
        </div>
    );

    useEffect(() => {
        setTimeout(() => {
            setChangesConfirmed(false)
        }, 4000)
    }, [changesConfirmed])
    
    const show = (position: any) => {
        setPosition(position);
        setEditFormState(true);
    };
    
    function resetCodeAndValue() {
        setUpdatedDataCode(null)
        setUpdatedValue('')
        setSelectedDataCode(null)
        setSelectedDonneesRefLib('')
    }

    // function qui se charge de la mise a jour du status d'une annee academique
    const handleAnneeAcademiqueStatusChange = async () => {

        try {

            let dataToBeSubmitted = {
                aacModifierPar: "yannickwnz",
                aacStatus: updateStatusData.newStatus
            }
            
            const response = await axios.put(`${backendApi}/api/anneeAcademique/${updateStatusData.aacCode}`, dataToBeSubmitted)

            // console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
                if(updateStatusData.newStatus) {
                    showSuccess('Annee activer avec succes')
                } else {
                    showSuccess('Annee desactivee avec succes')
                }
            }

        } catch (error) {
            console.log(error)
        }

    }


    // function qui montre les messages de succes lorsque une donnee a ete mise a jour, creer supprimer avec succes ...
    const showSuccess = (details: string) => {
        toast.current && toast.current.show({severity:'success', summary: 'Succes', detail:`${details}`, life: 3000});
        // toast.current && toast.current.show({severity:'success', summary: 'Succes', detail:'Mis a jour effectue', life: 3000});
    }

    // function qui se charge de fetch toutes les annee academiques
    const fetchingAnneeAnneeAcademiqueData = async () => {

        try {
            const response = await axios.get(`${backendApi}/api/anneeAcademique`)

            if(response.status === 200) {
                if(donnesRef === "Promotion") {
                    setFetchedPromotionAnneeAcademique(response.data)
                    return
                } else if(donnesRef === "Annee Academique") {
                    setFetchedDonneesRefsData(response.data)
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la creation des promotions
    const submitPromotionData = async () => {

        let dataToBeSubmitted = {
            proLib: newDataValue,
            proCreerPar: "yannickwnz",
            proAacCode: selectedAnneeAcademiqueCode
        }

        try {
            
            const response = await axios.post(`${backendApi}/api/promotion`, dataToBeSubmitted)

            // console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
                getAllPromotionData(selectedAnneeAcademiqueCode)
                // resetCodeAndValue()
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la recuperation des promotions
    const getAllPromotionData = async (aacCode: number | null) => {

        if(aacCode === null || !aacCode) return;

        try {
            
            const response = await axios.get(`${backendApi}/api/promotion/${aacCode}`)

            // console.log(response.data)
            if(response.status === 200) {
                setFetchedDonneesRefsData(response.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la mise a jour des promotions
    const updataPromotionData = async () => {

        
        let dataToBeSubmitted = {
            proLib: updatedValue,
            proModifierPar: "yannickwnz",
        }

        try {
            
            const response = await axios.put(`${backendApi}/api/promotion/${updatedDataCode}`, dataToBeSubmitted)

            // console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
                // resetCodeAndValue()
                getAllPromotionData(selectedAnneeAcademiqueCode)
            }

        } catch (error) {
            console.log(error)
            resetCodeAndValue()
        }

    }

    // function qui se charge de la suppression des promotions
    const deletePromotionData = async () => {

        if(setSelectedDataCode === null) return;

        try {
            
            const response = await axios.delete(`${backendApi}/api/promotion/${selectedDataCode}`)

            // console.log(response.data)
            if(response.status === 200) {
                fetchingDonnessReferentielles()
                // resetCodeAndValue()
                getAllPromotionData(selectedAnneeAcademiqueCode)
                showSuccess('Donnée supprimée avec succes')
            }

        } catch (error) {
            console.log(error)
            resetCodeAndValue()
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
            aacModifierPar: "yannickwnz",
            aacStatus: false
        }

        try {
            
            const response = await axios.put(`http://localhost:8080/api/anneeAcademique/${updatedDataCode}`, dataToBeSubmitted)

            // console.log(response.data)
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
                case "Promotion":
                fetchingAnneeAnneeAcademiqueData()
                setTypeOfDataFetched(typeOfDataFetchedEnums.CodeAndLibType);
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

            case "Promotion":
                submitPromotionData()
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
                showSuccess('Donnée supprimée avec succes')
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
            {/* dialog contenant l'input qui va servir a mettre a jour la donnee referentielles selectionnee */}
            {isEditFormVisible
                && 
                <Dialog 
                header="Modification" 
                visible={visible} 
                style={{ width: '30vw' }} 
                onHide={() => {
                    if (!isEditFormVisible) return; setEditFormState(false); setEditRefData(false); resetCodeAndValue()
                }} 
                position={position}
                footer={footerContent}>
                    <InputText 
                        // value={value} 
                        onChange={(e) => 
                            {
                                setUpdatedValue(e.target.value)
                            }
                        } 
                        className='w-full outline-none'
                        defaultValue={updatedValue}
                    />
                </Dialog>
            }

            {/* dialog containing form that added new donnees referentielles */}
            {/* dialog contenant l'input qui va creer une nouvelle donnee referentielle */}
            {newDonneesRefFormState 
                && 
                <>

                    <Dialog 
                    header="Creer une nouvelle donnee" 
                    visible={visible}
                    style={{ width: '40vw' }} 
                    onHide={() => {
                        if (!newDonneesRefFormState) return; setEditFormState(false); setEditRefData(false); setNewDonneesRefFormState(false); setSelectedAnneeAcademiqueCode(null); setSelectedDonneesRefLib(''); seNewDataValue('')
                    }} 
                    position={position}
                    footer={footerContent}>

                        {/* {donnesRef === "Promotion" 
                        && 
                        <div 
                            className="w-full flex justify-content-start mb-4"
                        >
                            <Dropdown 
                                value={selectedDonneesRefLib} 
                                onChange={(e: DropdownChangeEvent) => {
                                    setSelectedDonneesRefLib(e.value)
                                    console.log(e.target.value.aacCode)
                                    setSelectedAnneeAcademiqueCode(e.target.value.aacCode)
                                }} 
                                options={fetchedPromotionAnneeAcademique} 
                                // options={cities} 
                                optionLabel="aacLib" 
                                placeholder="Selectionnez une Annee Academique" 
                                // className="w-full md:w-14rem"
                                className="w-full"
                            />
                        </div>} */}

                        <InputText 
                            value={newDataValue} 
                            onChange={(e) => 
                                seNewDataValue(e.target.value)
                            } 
                            className='w-full outline-none'
                        />
                    </Dialog>
                
                </>

            }

            {/* dialog containing lists of selected donnees referentielles */}
            {/* dialog contenant la liste des donnees referentielles */}
            <Dialog 
                header={`Mise à jour ${donnesRef}`} 
                visible={visible} 
                style={{ width: '50vw' }}
                // onHide est la fonction derriere l'icone X qui permet de fermer les fenetres qui affichent les donnees referentielles
                // setPopUpState est la function qui permet l'affichage de la fenetre ... 
                // setDonneesRef est la fonction qui contient le nom de la donnee ref qui a dynamique envoye depuis la page /donnees-ref
                // setFetchedDonneesRefsData

                onHide={() => {if (!visible) return; setVisible(false); setPopUpState(false); setDonneesRef(''); setTypeOfDataFetched(''); setFetchedDonneesRefsData([]); }}
            >
                
                <div className="p-0 m-0 popup-container">
                    <div className="flex justify-end btn-wrapper">
                        
                        {donnesRef === "Promotion" && <div 
                            className="w-full flex justify-content-start"
                        >
                            <Dropdown 
                                value={selectedDonneesRefLib} 
                                onChange={(e: DropdownChangeEvent) => {
                                    setSelectedDonneesRefLib(e.value)
                                    setSelectedAnneeAcademiqueCode(e.target.value.aacCode)
                                    getAllPromotionData(e.target.value.aacCode)

                                }} 
                                options={fetchedPromotionAnneeAcademique} 
                                // options={cities} 
                                optionLabel="aacLib" 
                                placeholder="Selectionnez une Annee Academique" 
                                // className="w-full md:w-14rem"
                                className="w-[40%]"
                            />
                        </div>}

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
 
                    {/* <div className="">
                        {typeOfDataFetched === typeOfDataFetchedEnums.CodeAndLibType && <TableData 
                            data={products}
                            isEditFormVisible={isEditFormVisible}
                            setEditFormState={setEditFormState}
                            functionSettingEditFormPosition={show}
                            functionSettingEditFormInputValue={setValue}
                        />}

                    </div> */}

                    {typeOfDataFetched === typeOfDataFetchedEnums.AnneeAcademiqueType && <div>
                        {fetchedDonneesRefsData.length > 0 ? <div className='table-wrapper'>
                                <table className=''>
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
                                                        onChange={(e:  ToggleButtonChangeEvent) => {
                                                            setChecked(e.value)
                                                            console.log(e.target.value)
                                                            setUpdateStatusData({
                                                                newStatus: e.target.value,
                                                                aacCode: data.aacCode
                                                            })
                                                        }} 
                                                        onClick={() => {
                                                            setConfirmationDialogVisibility(true)
                                                            if(data.aacStatus) {
                                                                setConfirmationDialogMessage('Êtes vous sûre de vouloir désactiver cette année académique ?')
                                                            } else {
                                                                setConfirmationDialogMessage("Êtes vous sûre de vouloir activer cette année academique? L'année en cours actuelle sera automatique désactiver")
                                                            }
                                                        }}
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
                                                                setIsDataBeingDeleted(true)
                                                                setSelectedDataCode(data.aacCode)
                                                                setConfirmationDialogMessage('Êtes vous sûre de vouloir supprimer cette donnée ?')
                                                                setConfirmationDialogVisibility(true)
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
                                <p style={{ maxWidth: "70%" }} className='border-4'>Aucune Année académique créée. Cliquez sur créer pour en ajouter une.</p>
                            </div>
                        }
                    </div>}

                        {/* Promotion data starts */}
                    {typeOfDataFetched === typeOfDataFetchedEnums.CodeAndLibType 
                    && 
                    <div className="">
                        {selectedAnneeAcademiqueCode && fetchedDonneesRefsData.length > 0 ? <div className='table-wrapper'>
                            <table>
                                <th>Code</th>
                                <th>Lib</th>
                                <th></th>
                                { fetchedDonneesRefsData?.map(data => {
                                    return (
                                        <tr className='font-bold' key={data.proCode}>
                                            <td>{data.proCode}</td>
                                            <td>{data.proLib}</td>
                                            <td>
                                                <div className="icons-wrapper">
                                                    <i
                                                        className="pi pi-file-edit"
                                                        style={{ fontSize: '1.2rem', marginRight: '1rem' }}
                                                        onClick={() => {
                                                            setEditFormState(true)
                                                            setUpdatedValue(data.proLib)
                                                            setUpdatedDataCode(data.proCode)
                                                        }}
                                                    ></i>
                                                    <i
                                                        className="pi pi-trash"
                                                        style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                                        onClick={() => {
                                                            setIsDataBeingDeleted(true)
                                                            setSelectedDataCode(data.proCode)
                                                            setConfirmationDialogMessage('Êtes vous sûre de vouloir supprimer cette donnée ?')
                                                            setConfirmationDialogVisibility(true)
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
                            {/* <p style={{ maxWidth: "70%" }} className='border-4'>Aucune {donnesRef} créée. Cliquez sur créer pour en ajouter une.</p> */}
                            {selectedAnneeAcademiqueCode && fetchedDonneesRefsData.length === 0 ? 
                            <p style={{ maxWidth: "70%" }} className='border-4'>Aucune Promotion enregistrée pour cette année academique. Cliquez sur créer pour en ajouter une</p>
                            :
                            <p style={{ maxWidth: "70%" }} className='border-4'>Veuillez selectionnez une annnee academique pour afficher ses promotions.</p>
                        }
                        </div>
                    }
                    </div>}
                        {/* Promotion data ends */}


                    
                </div>

            </Dialog>

            {/* dialog showing confirmation message*/}
            <Dialog header="Confirmer votre action" visible={confirmationDialogVisibility} style={{ width: '30vw' }} onHide={() => {if (!visible) return; setConfirmationDialogVisibility(false); setIsDataBeingDeleted(false) }} footer={confirmDialogFooterContent}>
                {confirmationDialogMessage && <div className='flex'>
                    <span>
                        <i className="pi pi-info-circle" style={{ fontSize: '2rem', marginRight: '.5em' }}></i>
                    </span>
                    <p className="m-0" style={{ fontSize: '1.1rem' }}>
                        {/* Etes vous sure de vouloir activer cette annee academique?
                    
                        Toutes les autres annees seront automatiquement desactivees */}
                        {confirmationDialogMessage}
                    </p>
                </div>}

            </Dialog>

            {/* {changesConfirmed && <Toast ref={toast} />} */}
            <Toast ref={toast} />
            <Toast ref={deleteToast} />
            <Toast ref={updateStatusToast} />

        </>
    )

}