const API= "/bd_local/bd.json";

export const getBD=async()=>{
    try {

        const response=await fetch(API);
        const data=await response.json();
        return data;    

    } catch (error) {

        console.log("Hubo un error",error);   

    }
    
}

