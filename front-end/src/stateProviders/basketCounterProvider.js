import React, { createContext, useReducer } from 'react'

// create user state Context
export const basketCounterContext = createContext()
const initialState = JSON.parse(localStorage.getItem('basket') || JSON.stringify([]))


const reducer = (state, action) => {
    switch (action.type) {
        case 'addItem': return [...state, action.payload]
        case 'clear': return []
    }
}


function BasketCounterProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <basketCounterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </basketCounterContext.Provider>

    )
}

export default BasketCounterProvider
