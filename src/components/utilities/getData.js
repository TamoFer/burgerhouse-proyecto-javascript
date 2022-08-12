// defino ruta de mi BD local
const API= "../src/data/bd.json";

//exporto funcion que me devuelve los datos de mi BD
export const getBD=async()=>{

    try {

        const response=await fetch(API);
        const data=await response.json();
        return data;    

    } catch (error) {

        console.log("Hubo un error",error);   

    }
    
}

