import axios from "axios";

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const handleFetchServiceFiliereData = async (donnesRef: string) => {

    if(donnesRef !== "Filiere") return;

    try {
            
        const response = await axios.get(`${backendApi}/api/filiere`)

        // console.log(response.data)
        if(response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.log(error)
    }

}