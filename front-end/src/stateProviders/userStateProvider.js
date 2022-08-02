import React, { createContext, useReducer } from 'react'

// create user state Context
export const userContext = createContext()

// should be replace with a reducer
const initialUserState = {
    isLogin: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login': return { ...state, isLogin: true }
        case 'logout': return { ...state, isLogin: false }
        default: throw new Error('something went wrong in the user state reducer')
    }
}


function UserStateProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialUserState)

    return (
        <userContext.Provider value={{ state, dispatch }}>
            {props.children}
        </userContext.Provider>

    )
}

export default UserStateProvider
