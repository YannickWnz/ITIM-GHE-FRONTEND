import React, { useState } from 'react'
import '../../styles/components/ClassesFilieres.scss'

// prime react components import
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Divider } from 'primereact/divider';


type ClassesFilieresProps = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function ClassesFilieres({visible, setVisible}: ClassesFilieresProps) {


  return (
    <>
        <Dialog header="Mis a jour filiere" className='border-none' visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <Splitter style={{ minHeight: '400px' }}>
                <SplitterPanel className="flex">
                    <div className="p-0 m-0 w-full donnees-container">
                        <ul className='p-0'>
                            <div className='data-wrapper border-1 border-[#E5E7EB] flex'>
                                <li className='list-none'>1ere Annee Informatique</li>
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
                                <li className='list-none'>2eme Annee Informatique de gestion</li>
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
                        </ul>
                </div>
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center">Panel 2</SplitterPanel>
            </Splitter>
        </Dialog>
    </>
  )
}

export default ClassesFilieres