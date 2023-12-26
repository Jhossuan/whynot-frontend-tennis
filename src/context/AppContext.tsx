import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { DecodedToken } from "../api/AuthService";
import { DecodedData } from "../types/auth";

declare global {
    type ChildrenProps = {
        children?: React.ReactNode
    }
}

export const InitDecodedData: DecodedData = {
    uid: '',
    name: '',
    email: '',
    id: '',
    type: 'regular',
    exp: '',
    iat: ''
}

type UserEntryT = 'login' | 'register' | 'verificateAccount' | 'forgotPassword'

interface AppContextI {
    userToken: string | null
    setUserEntry: (user: UserEntryT) => void
    userEntry: UserEntryT
    userData: DecodedData
    isLoading: boolean
}

export const AppContext = createContext<AppContextI>({
    userToken:"",
    setUserEntry: (user: UserEntryT) => user,
    userEntry: 'login',
    userData: InitDecodedData,
    isLoading: false,
})

export const AppContextProvider = (props: ChildrenProps) => {

    const [userEntry, setUserEntry] = useState<UserEntryT>("login")
    const [userData, setUserData] = useState<DecodedData>(InitDecodedData)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const userToken = Cookies.get('token') as string

    const decodedToken = async() => {
        setIsLoading(true)
        const res = await DecodedToken(userToken)
        if(res.status !== 200){
            setIsLoading(false)
            Cookies.remove('token')
            return
        }
        setUserData(res.response)
        setIsLoading(false)
    }

    useEffect(() => {
        decodedToken()
    }, [userToken])

    return (
        <AppContext.Provider
            value={{
                userToken,
                userEntry,
                setUserEntry,
                userData,
                isLoading
            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}