import axios from 'axios';
import React, { useEffect, useState } from 'react'

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL;


function useApi() {
  return (
    <div></div>
  )
}

type niveauDataStructure = {
    nivLib: string,
    nivCode: number
}

export const useNiveauDonneesRef = () => {

    const [niveauData, setNiveauData] = useState<niveauDataStructure[]>([])

    const fetchData = async () => {
        try {

            const response = await axios.get(`${backendApi}/api/niveau`)
            
            if(response.status === 200) {
                console.log(response.data)
                setNiveauData(response.data)
            }
            
        } catch (error) {
            console.log(error)
        }

        return {niveauData}
    }

    useEffect(() => {
        fetchData()
    }, [])

}

export default useApi