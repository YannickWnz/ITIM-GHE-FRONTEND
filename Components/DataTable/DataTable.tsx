import React, { useRef, useState } from 'react'
import '../../styles/components/TableData.scss'

// prime react icons import
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type TableDataProps = {
    data: { code: string; lib: string; }[];
    isEditFormVisible: boolean
    setEditFormState: React.Dispatch<React.SetStateAction<boolean>>
    functionSettingEditFormInputValue: React.Dispatch<React.SetStateAction<string>>
    functionSettingEditFormPosition: (position: any) => void
}

export const TableData = (
    {
        data, 
        isEditFormVisible, 
        setEditFormState, 
        functionSettingEditFormPosition, 
        functionSettingEditFormInputValue
    }: TableDataProps) => {


    return (
        <>

            <div className='table-wrapper'>
                <table>
                    <th>Code</th>
                    <th>Lib</th>
                    <th></th>
                    { data?.map(product => {
                        return (
                            <tr className='font-bold' key={product.code}>
                                <td>{product.code}</td>
                                <td>{product.lib}</td>
                                <td>
                                    <div className="icons-wrapper">
                                        <i
                                        className="pi pi-file-edit"
                                        style={{ fontSize: '1.2rem', marginRight: '1rem' }}
                                        onClick={() => {
                                            // setEditRefData(true)
                                            // show('top')
                                            setEditFormState(true)
                                            functionSettingEditFormPosition('top')
                                            console.log('editing ...')
                                            functionSettingEditFormInputValue(product.lib)
                                        }}
                                        ></i>
                                        <i
                                        className="pi pi-trash"
                                        style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                        onClick={() => {
                                            // confirmDelete()
                                        }}
                                        >
                                        </i>
                                    </div>
                                </td>
                            </tr>
                        )
            
                    })}
                    {/* <tr className='font-bold'>
                        <td>001</td>
                        <td>Exemple Donnee 1</td>
                        <td>
                            <div className="icons-wrapper">
                                <i
                                className="pi pi-file-edit"
                                style={{ fontSize: '1.2rem', marginRight: '1rem' }}
                                onClick={() => {
                                    // setEditRefData(true)
                                    // show('top')
                                }}
                                ></i>
                                <i
                                className="pi pi-trash"
                                style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                onClick={() => {
                                    // confirmDelete()
                                }}
                                >
                                </i>
                            </div>
                        </td>
                    </tr> */}
                    {/* <tr className='font-bold'>
                        <td>002</td>
                        <td>Exemple Donnee 2</td>
                        <td>
                            <div className="icons-wrapper">
                                <i
                                className="pi pi-file-edit"
                                style={{ fontSize: '1.2rem', marginRight: '1rem' }}
                                onClick={() => {
                                    // setEditRefData(true)
                                    // show('top')
                                }}
                                ></i>
                                <i
                                className="pi pi-trash"
                                style={{ fontSize: '1.2rem', color: 'crimson', fontWeight: 'bold' }}
                                onClick={() => {
                                    // confirmDelete()
                                }}
                                >
                                </i>
                            </div>
                        </td>
                    </tr> */}
                </table>
            </div>
        </>
    )

}