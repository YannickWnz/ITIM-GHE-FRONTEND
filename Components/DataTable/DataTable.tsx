import React from 'react'
import '../../styles/components/TableData.scss'

type TableDataProps = {
    code: string | number,
    lib: string
}

export const TableData = () => {

    return (
        <div className='table-wrapper'>
            <table>
                <th>Code</th>
                <th>Lib</th>
                <th></th>

                <tr className='font-bold'>
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
                </tr>
                <tr className='font-bold'>
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
                </tr>

            </table>
        </div>
    )

}