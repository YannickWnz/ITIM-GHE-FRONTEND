import React, { useState } from 'react'
import '../../styles/components/ClassesFilieres.scss'

// prime react components import
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Divider } from 'primereact/divider';
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";


        



interface City {
    name: string;
    code: string;
} 


type ClassesFilieresProps = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function ClassesFilieres({visible, setVisible}: ClassesFilieresProps) {

    const [ingredient, setIngredient] = useState<string>('');
    const [selected, setSelected] = useState<boolean>(false);

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];


  return (
    <>
        <Dialog header="Mis a jour filiere" className='border-none' visible={visible} style={{ width: '95vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>

        <div className="card flex justify-content-center">
            {/* filiere section start */}
            <div className="p-0 m-0 w-full donnees-container">
                <div className="flex justify-between btn-wrapper">
                    <p>Filieres</p>
                    <span><Button label="Ajouter une filiere" icon="pi pi-plus-circle" iconPos="right" /></span>
                </div>
                <ul className='p-0 w-100'>
                    <div 
                    className={`data-wrapper flex ${selected ? 'selected' : ''}`}
                    onClick={() => {
                        setSelected(true)
                        setIngredient('Cheese')
                    }}
                    >
                        <div className="list flex align-center">
                            <RadioButton className='' inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                            <li className='list-none ml-2.5'>Filiere 1</li>
                        </div>
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
                    <div 
                    className={`data-wrapper flex ${selected ? '' : ''}`}
                    onClick={() => {
                        setSelected(true)
                        setIngredient('Cheese')
                    }}
                    >
                        <div className="list flex align-center">
                            <RadioButton className='' inputId="ingredient1" name="pizza" value="Mushroom" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                            <li className='list-none ml-2.5'>Filiere 2</li>
                        </div>
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
            {/* filiere section ends */}

            {/* filiere & niveau divider */}
            <Divider layout="vertical" />

            {/* niveau section start */}
            <div className="p-0 m-0 w-full donnees-container">
                <div className="flex justify-between btn-wrapper">
                    <p>Niveau</p>
                    <span><Button label="Ajouter une filiere" icon="pi pi-plus-circle" iconPos="right" /></span>
                </div>
                <ul className='p-0 w-100'>
                    <div 
                    className={`data-wrapper flex ${selected ? 'selected' : ''}`}
                    onClick={() => {
                        setSelected(true)
                        setIngredient('Cheese')
                    }}
                    >
                        <div className="list flex align-center">
                            <RadioButton className='' inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                            <li className='list-none ml-2.5'>Niveau 1</li>
                        </div>
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
                    <div 
                    className={`data-wrapper flex ${selected ? '' : ''}`}
                    onClick={() => {
                        setSelected(true)
                        setIngredient('Cheese')
                    }}
                    >
                        <div className="list flex align-center">
                            <RadioButton className='' inputId="ingredient1" name="pizza" value="Mushroom" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                            <li className='list-none ml-2.5'>Niveau 2</li>
                        </div>
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
            {/* niveau section ends */}

            {/* niveau & classe divider */}
            <Divider layout="vertical" />

            <div className="p-0 m-0 w-full donnees-container">
                <div className="flex justify-between btn-wrapper">
                    <p>Classes</p>
                    <span><Button label="Ajouter une classe" icon="pi pi-plus-circle" iconPos="right" /></span>
                </div>
                <ul className='p-0'>
                    <div className='data-wrapper border-1 border-[#E5E7EB] flex'>
                        <div className="list flex align-center">
                            {/* <RadioButton className='' inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Cheese'} /> */}
                            <li className='list-none ml-2.5'>Classe 1</li>
                        </div>
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
                    <div className='data-wrapper border-1 border-[#E5E7EB] flex'>
                        <div className="list flex align-center">
                            {/* <RadioButton className='' inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Cheese'} /> */}
                            <li className='list-none ml-2.5'>Classe 2</li>
                        </div>
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
                    <div className='data-wrapper border-1 border-[#E5E7EB] flex'>
                        <div className="list flex align-center">
                            {/* <RadioButton className='' inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setIngredient(e.value)} checked={ingredient === 'Cheese'} /> */}
                            <li className='list-none ml-2.5'>Classe 3</li>
                        </div>
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

            {/* classe & rubrique divider */}
            {/* <Divider layout="vertical" />

            <div className="p-0 m-0 w-full donnees-container">
                <div className="flex justify-between btn-wrapper">
                    <p>Rubrique</p>
                    <span><Button label="Ajouter une classe" icon="pi pi-plus-circle" iconPos="right" /></span>
                </div>
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
                </ul>
            </div> */}

            

        </div>

        </Dialog>
    </>
  )
}

export default ClassesFilieres