import React, {createContext, useState} from 'react'
export const AppContext = createContext();

export const AppState = ({children}) => {

    const [userEmailFromRegistration, setUserEmailFromRegistration] = useState('');

    return (
        <AppContext.Provider value={{ userEmailFromRegistration, setUserEmailFromRegistration }}>
            {children}
        </AppContext.Provider>
    )
}