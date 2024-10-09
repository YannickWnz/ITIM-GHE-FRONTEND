import React, { useState } from 'react'

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import '../../styles/components/ClassesDonneesRefPopUp.scss'

type TComponentProps = {
    isComponentVisible: boolean,
    setComponentVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClassesDonnesRefPopUp = ({isComponentVisible, setComponentVisibility}: TComponentProps) => {

    const [visible, setVisible] = useState(true);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedFiliere, setSelectedFiliere] = useState(null);
    const [selectedNiveau, setSelectedNiveau] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

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

    const africanCountries = [
        { name: 'Central African Republic', code: 'CAR' },
        { name: 'Ghana', code: 'GH' },
        { name: 'Cameroon', code: 'CMR' },
        { name: 'Kenya', code: 'KN' },
        { name: 'Zimbabwe', code: 'ZBW' }
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
                        <Dropdown value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.value)} options={niveau} optionLabel="name"
                            placeholder="Selectionnez un niveau" className="w-full md:w-14rem" />
                    </div>

                    <div className="">
                        <span className='font-bold'>Filiere: </span>
                        <Dropdown style={{ outline: 'none' }} value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.value)} options={filieres} optionLabel="name"
                            placeholder="Selectionnez une filiere" className="w-full md:w-14rem" />
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

                <div className="p-0 m-0 popup-container">
                    <ul className='p-0'>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>Exemple Donnee Referentielle 1</li>
                            <div className="icons-wrapper">
                                <i 
                                className="pi pi-file-edit" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {
                                    // setEditRefData(true)
                                    // show('top')
                                }}
                                ></i>
                                <i 
                                className="pi pi-trash" 
                                style={{ fontSize: '1.1rem' }}
                                onClick={() => {
                                    // confirmDelete()
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
        </>
    )
}