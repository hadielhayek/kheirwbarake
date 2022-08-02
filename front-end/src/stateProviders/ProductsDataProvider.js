import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export const categoriesContext = createContext()



function ProductDataProvider({ children }) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {

            try {
                const response = await axios.get('categories')
                setCategories(response.data)
            }
            catch (err) {
                console.error(err)
            }

        }
        fetchCategories()
    }, [])
    return (

        (categories.length > 0) ?
            <categoriesContext.Provider value={categories}>
                {children}
            </categoriesContext.Provider>
            :
            <Box sx={{ width: '100%' }}>
                <LinearProgress color='secondary' />
            </Box>
    )
}

export default ProductDataProvider
