import React, {createContext, useState, useEffect} from 'react';

import axios from 'axios';

//Crear el context
export const CategoriesContext = createContext();

//Provider es donde se encuentran las funciones y state
const CategoriesProvider = (props) =>{
    //Crear el state del context
    const [categories, saveCategories] = useState([]);

    //ejecutar el llamado a la api
    useEffect(() =>{
        const getCategories = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categories = await axios.get(url);

            // console.log(categories.data.drinks);
            saveCategories(categories.data.drinks);
        }
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;