import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

//crear el context
export const ModalContext= createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idrecipe, saveIdRecipe] = useState(null);
    const [information, saveRecipe] = useState({});

    // una vez que tenemos una receta, llama la api
    useEffect( () =>{
        const getRecipe = async () => {
            if(!idrecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;
            const result = await axios.get(url);
            // console.log(result.data.drinks[0]);
            saveRecipe(result.data.drinks[0]);
        }
        getRecipe();
    }, [idrecipe]);

    return (
        <ModalContext.Provider
            value={{
                information,
                saveIdRecipe,
                saveRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}

export default ModalProvider;