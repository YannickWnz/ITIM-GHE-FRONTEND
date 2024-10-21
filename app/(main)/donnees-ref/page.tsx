"use client";

import React, { useEffect, useRef, useState } from 'react'

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
import { CgPathDivide } from "react-icons/cg";



// primereact component imports
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';




// css file imports
import '../../../styles/components/DonneesRef.scss'
import ClassesFilieres from '@/Components/ClassesFilieres/ClassesFilieres';
import { DonneesRefPopUp } from '@/Components/DonneesRefPopUp/DonneesRefPopUp';
import { ClassesDonnesRefPopUp } from '@/Components/ClassesDonneesRefPopUp/ClassesDonnesRefPopUp';

type DialogPositionType = {
    type: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}



function DonneesRef() {

    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const toast = useRef<Toast>(null);
    const deleteToast = useRef<Toast>(null);

    const [visible, setVisible] = useState(false);
    const [isEditFormVisible, setEditFormState] = useState(false);
    const [value, setValue] = useState('');
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top');
    // const [position, setPosition] = useState<string>('center');
    const [changesConfirmed, setChangesConfirmed] = useState(false)

    const [isClasseFiliereVisible, setClasseFiliereVisibility] = useState(false)

    const [donneesRefPopUpState, setDonneesRefPopUpState] = useState<boolean>(false)

    const [selectedDonneesRef, setSelectedDonneesRef] = useState<string>('')

    const [editRefData, setEditRefData] = useState<boolean>(false)

    const [classesDonneesRefPopUp, setClasseDonneesRefPopUp] = useState<boolean>(false)
    

  return (
    <>
        <ConfirmDialog />

        <ClassesFilieres 
            visible={isClasseFiliereVisible}
            setVisible={setClasseFiliereVisibility}
        />

        <h1>Mise a jour des donnees referentielles</h1>

        <div className="grid">

            {/* promotion starts */}
            <div 
            className="col-12 lg:col-6 xl:col-3 cursor-pointer"
            onClick={() => {
                setVisible(true)
                setSelectedDonneesRef('Promotion')
                setDonneesRefPopUpState(true)
            }}
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
            {/* promotion ends */}

            {/* annee academique starts */}
            <div 
            className="col-12 lg:col-6 xl:col-3 cursor-pointer"
            onClick={() => {
                setVisible(true)
                setSelectedDonneesRef('Annee Academique')
                setDonneesRefPopUpState(true)
            }}
            >
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
            {/* annee academique ends */}

            {/* filiere starts */}
            <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{
                    // setClasseFiliereVisibility(true)
                    setVisible(true)
                    setSelectedDonneesRef('Filiere')
                    setDonneesRefPopUpState(true)
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
            {/* filiere ends */}

            {/* niveau starts */}
            <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{
                    // setClasseFiliereVisibility(true)
                    setVisible(true)
                    setSelectedDonneesRef('Niveau')
                    setDonneesRefPopUpState(true)
                }}
            >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Niveau</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <SiLevelsdotfyi className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            {/* niveau ends */}

            {/* classe starts */}
            <div 
                className="col-12 lg:col-6 xl:col-3 cursor-pointer"
                onClick={() =>{
                    // setClasseDonneesRefPopUp(true)
                    setVisible(true)
                    setSelectedDonneesRef('Classe')
                    setDonneesRefPopUpState(true)
                }}
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
            {/* classe ends */}

            {/* rubrique starts */}
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Rubrique</span>
                            <div className="text-900 font-medium text-xl">3</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <CgPathDivide className='text-blue-500 text-xl' />
                        </div>
                    </div>
                </div>
            </div>
            {/* rubrique ends */}

            {/* matiere starts */}
            <div 
            className="col-12 lg:col-6 xl:col-3 cursor-pointer"
            onClick={() => {
                setVisible(true)
                setSelectedDonneesRef('Matiere')
                setDonneesRefPopUpState(true)
            }}
            >
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
            {/* matiere ends */}

            {/* type professeur starts */}
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
            {/* type professeur ends */}

            {/* volume horaire starts */}
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
            {/* volume horaire ends */}

        </div>
        

        {/* donnees referentielles pop up start */}
         {
             donneesRefPopUpState 
             &&
             <DonneesRefPopUp 
                // passing selected donnees ref to the pop up (ex: Promotion, Annee Academique, Filiere, etc)
                donnesRef={selectedDonneesRef}

                // padding setter function so it be emptied when popup is closed
                setDonneesRef={setSelectedDonneesRef}

                // popup state allow to toggle on\off the popup
                popUpState={donneesRefPopUpState}
                
                // popup state function setter 
                setPopUpState={setDonneesRefPopUpState}
             />
        }
        {/* donnees referentielles pop up ends */}

        {/* classe donnees referentielles pop up start */}
        {classesDonneesRefPopUp 
            && 
            <ClassesDonnesRefPopUp  
            isComponentVisible={classesDonneesRefPopUp}
            setComponentVisibility={setClasseDonneesRefPopUp}
            />
        }
        {/* classe donnees referentielles pop up end */}
    </>
  )
}

export default DonneesRef