"use client";

import React, { useState } from 'react'

// react icons imports
import { IoMdSchool } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa";

// primereact component imports
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

// css file imports
import '../../../styles/components/DonneesRef.scss'



function DonneesRef() {

    const [visible, setVisible] = useState(false);

    const footerContent = (
        <div>
            <Button label="Annulez" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Confirmez" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

  return (
    <>
        <h1>Mise a jour des donnees referentielles</h1>
        {/* dialog test start*/}
        
            <Dialog header="Mise a jour promotion" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                
                <div className="p-0 m-0 donnees-container">
                    <ul className='p-0'>
                        <div className='data-wrapper flex'>
                            <li className='list-none'>1ere Annee Informatique</li>
                            <div className="icons-wrapper">
                                <i className="pi pi-file-edit" style={{ fontSize: '1.1rem' }}></i>
                                <i className="pi pi-trash" style={{ fontSize: '1.1rem' }}></i>
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

                {/* <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p> */}
            </Dialog>
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
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Classe</span>
                            <div className="text-900 font-medium text-xl">5</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            {/* <i className="pi pi-graduation-cap text-blue-500 text-xl" /> */}
                            <SiGoogleclassroom className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Filiere</span>
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
                            <span className="block text-500 font-medium mb-3">Rubrique</span>
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
                            <span className="block text-500 font-medium mb-3">Matiere</span>
                            <div className="text-900 font-medium text-xl">6</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <FaBook className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DonneesRef