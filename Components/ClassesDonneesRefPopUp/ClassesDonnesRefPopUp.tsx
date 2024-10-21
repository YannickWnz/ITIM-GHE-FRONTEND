import React, { useEffect, useState } from 'react'

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import '../../styles/components/ClassesDonneesRefPopUp.scss'
import { useNiveauDonneesRef } from '../Hooks/useApi';
import { fetchedDonneesRefsDataStructure } from '@/types/donneesRef';
import axios from 'axios';

type TComponentProps = {
    isComponentVisible: boolean,
    setComponentVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL;


export const ClassesDonnesRefPopUp = ({isComponentVisible, setComponentVisibility}: TComponentProps) => {

    const [visible, setVisible] = useState(true);

    const [selectedFiliere, setSelectedFiliere] = useState(null);
    const [selectedNiveau, setSelectedNiveau] = useState(null);

    const [niveauData, setNiveauData] = useState<fetchedDonneesRefsDataStructure[]>([]);
    const [filiereData, setFiliereData] = useState<fetchedDonneesRefsDataStructure[]>([]);
    const [fetchedDonneesRefsData, setFetchedDonneesRefsData] = useState<fetchedDonneesRefsDataStructure[]>([])


    const handleFetchedNiveauData = async () => {

        try {
            
            const response = await axios.get(`${backendApi}/api/niveau`)

            // console.log(response.data)
            if(response.status === 200) {
                setNiveauData(response.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    // function qui se charge de la recuperation des filieres
    const handleFetchFiliereData = async () => {

        try {
            
            const response = await axios.get(`${backendApi}/api/filiere`)

            // console.log(response.data)
            if(response.status === 200) {
                setFiliereData(response.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleCreateClasseData = async () => {

        let dataToBeSubmitted = {

        }

        try {
            
            const response = await axios.post(`${backendApi}/api/classe`)

            // console.log(response.data)
            if(response.status === 200) {
                setFiliereData(response.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleFetchFiliereData();
        handleFetchedNiveauData();
    }, [])

    const filieres = [
        { name: 'Filiere 1', code: 'F1' },
        { name: 'Filiere 2', code: 'F2' },
        { name: 'Filiere 3', code: 'F3' },
        { name: 'Filiere 4', code: 'F4' }
    ];

    const niveau = [
        { name: 'Niveau 1', code: 'N1' },
        { name: 'Niveau 2', code: 'N2' },
        { name: 'Niveau 3', code: 'N3' },
        { name: 'Niveau 4', code: 'N4' }
    ];


    return (
        <>
             <Dialog 
             header="Mise a jour Classe" 
             visible={visible} 
             style={{ width: '50vw', padding: '0' }} 
             onHide={() => {if (!visible) return; setVisible(false); setComponentVisibility(false) }}>
                <div 
                className="flex justify-between w-100"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div className="">
                        <span className='font-bold' >Niveau: </span>
                        <Dropdown value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.value)} options={niveauData} optionLabel="nivLib"
                            placeholder="Selectionnez un niveau" className="w-full md:w-14rem" />
                        {/* <Dropdown value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.value)} options={niveau} optionLabel="name"
                            placeholder="Selectionnez un niveau" className="w-full md:w-14rem" /> */}
                    </div>

                    <div className="">
                        <span className='font-bold'>Filiere: </span>
                        <Dropdown style={{ outline: 'none' }} value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.value)} options={filiereData} optionLabel="filLib"
                            placeholder="Selectionnez une filiere" className="w-full md:w-14rem" />
                        {/* <Dropdown style={{ outline: 'none' }} value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.value)} options={filieres} optionLabel="name"
                            placeholder="Selectionnez une filiere" className="w-full md:w-14rem" /> */}
                    </div>
                </div>
                <div className="flex justify-center btn-wrapper mt-3">
                    <span>
                        <Button 
                        // label={`Ajouter une ${donnesRef}`} 
                        label={`Creer`} 
                        icon="pi pi-plus-circle" 
                        iconPos="right" 
                        onClick={() => {
                            // setNewDonneesRefFormState(true)
                        }}
                        />
                    </span>
                </div>
                {/* <div className="text-center mt-2.5 font-bold content-wrapper">
                    <p className="m-[10px]">
                        Choississez le niveau et la filiere pour lesquels vous voulez ajouter des classes
                    </p>
                </div> */}

                {/* <div className="p-0 m-0 popup-container">
                    <ul className='p-0'>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>Exemple Donnee Referentielle 1</li>
                            <div className="icons-wrapper">
                                <i 
                                className="pi pi-file-edit" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {}}
                                ></i>
                                <i 
                                className="pi pi-trash" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {}}
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
                </div> */}
                
                                        {/* Promotion data starts */}
                                        {
                                            <div className="">
                                                {fetchedDonneesRefsData.length > 0 ? <div className='table-wrapper'>
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
                                                                                onClick={() => {}}
                                                                            ></i>
                                                                            <i
                                                                                className="pi pi-trash"
                                                                                style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                                                                onClick={() => {}}
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
                                                    {selectedFiliere && selectedNiveau && <p style={{ maxWidth: "70%" }} className='border-4'>Aucune Classe créée pour le Niveau et la Filiere selectionnee. Cliquez sur créer pour en ajouter.</p>}
                                                    
                                                    {((!selectedFiliere && !selectedNiveau) || (selectedFiliere && !selectedNiveau) || (!selectedFiliere && selectedNiveau)) && <p style={{ maxWidth: "70%" }} className='border-4'>Selectionner une filiere et un niveau pour afficher leurs classes ou pour en ajouter.</p>}

                                                </div>
                                            }
                                            </div>
                                            }
                        {/* Promotion data ends */}

            </Dialog>
        </>
    )
}