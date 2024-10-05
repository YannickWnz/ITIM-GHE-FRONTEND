import React from 'react'

// react icons imports
import { IoMdSchool } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa";


function page() {
  return (
    <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Promotion</span>
                        <div className="text-900 font-medium text-xl">3</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        {/* <i className="pi pi-graduation-cap text-blue-500 text-xl" /> */}
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
  )
}

export default page