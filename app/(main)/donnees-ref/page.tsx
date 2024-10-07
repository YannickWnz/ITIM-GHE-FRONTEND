"use client";

import React, { useRef, useState } from 'react'

// react icons imports
import { IoMdSchool } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { LiaIndustrySolid } from "react-icons/lia";
import { SiLevelsdotfyi } from "react-icons/si";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { FaBusinessTime } from "react-icons/fa";
import { GiTimeBomb } from "react-icons/gi";


// primereact component imports
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';




// css file imports
import '../../../styles/components/DonneesRef.scss'
import ClassesFilieres from '@/Components/ClassesFilieres/ClassesFilieres';

type DialogPositionType = {
    type: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}



function DonneesRef() {

    const toast = useRef<Toast>(null);
    const deleteToast = useRef<Toast>(null);

    const [visible, setVisible] = useState(false);
    const [isEditFormVisible, setEditFormState] = useState(false);
    const [value, setValue] = useState('');
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top');
    // const [position, setPosition] = useState<string>('center');
    const [changesConfirmed, setChangesConfirmed] = useState(false)

    const [isClasseFiliereVisible, setClasseFiliereVisibility] = useState(false)


    const [editRefData, setEditRefData] = useState(false)

    const footerContent = (
        <div>
            <Button label="Annulez" icon="pi pi-times" onClick={() => {
                setEditFormState(false)
                setEditRefData(false)
            }} className="p-button-text" />
            <Button label="Confirmez" icon="pi pi-check" onClick={() => {
                setEditFormState(false)
                setEditRefData(false)
                // setChangesConfirmed(true);
                setTimeout(() => setChangesConfirmed(false), 4000);
                showSuccess('Mis a jour effectue')
            }} autoFocus />
        </div>
    );


    
    const show = (position: any) => {
        setPosition(position);
        setEditFormState(true);
    };

    const accept = () => {
        deleteToast.current && deleteToast.current.show({ severity: 'info', summary: 'Suppresion reussie', detail: 'Donnees supprimer avec succes', life: 3000 });
    }   
    // const reject = () => {
    //     toast.current && toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected ', life: 3000 });
    // }                

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
        <ConfirmDialog />

        <ClassesFilieres 
            visible={isClasseFiliereVisible}
            setVisible={setClasseFiliereVisibility}
        />

        <h1>Mise a jour des donnees referentielles</h1>
        {/* dialog test start*/}
        
            {/* <Dialog header="Mise a jour promotion" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}> */}
            <Dialog header="Mise a jour promotion" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                
                <div className="p-0 m-0 donnees-container">
                    <ul className='p-0'>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>1ere Annee Informatique</li>
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
                            <li className='list-none'>2eme Annee Informatique de gestion</li>
                            <div className="icons-wrapper">
                                <i className="pi pi-file-edit" style={{ fontSize: '1.1rem' }}></i>
                                <i className="pi pi-trash" style={{ fontSize: '1.1rem' }}></i>
                            </div>
                        </div>
                    </ul>
                </div>

            </Dialog>

            {editRefData 
            && 
            <Dialog 
            header="" 
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
            </Dialog>}

        {/* dialog test end*/}
        <div className="grid">
            <div 
            className="col-12 lg:col-6 xl:col-3 cursor-pointer"
            onClick={() => setVisible(true)}
            >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Promotion</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <IoMdSchool className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Annee Academique</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <LuCalendarClock className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{
                    setClasseFiliereVisibility(true)
                }}
            >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Filiere</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <LiaIndustrySolid className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{}}
            >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Filiere</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <LiaIndustrySolid className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div> */}
            <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{}}
            >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Classe</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <SiGoogleclassroom className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Rubrique</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <LiaIndustrySolid className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Matiere</span>
                            <div className="text-900 font-medium text-xl">6</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <FaBook className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Type Professeur</span>
                            <div className="text-900 font-medium text-xl">5</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <GiTeacher className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Volume Horaire</span>
                            <div className="text-900 font-medium text-xl">5</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <FaBusinessTime className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast ref={toast} />
        <Toast ref={deleteToast} />
    </>
  )
}

export default DonneesRef