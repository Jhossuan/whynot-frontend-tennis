import { AppContext } from "../context/AppContext"
import { useContext } from 'react'
import { Navigate } from "react-router-dom"
import Cookies from 'js-cookie'


export const RequireAuth = (props: any) => {
    const { userToken } = useContext(AppContext)
    
    if(!userToken){
        return Navigate({to: "/"})
    }
    return props.children
}

export const NotRequireAuth = (props: any) => {
    const { userToken, userData } = useContext(AppContext)
    console.log('entra aqui 2')

    if(userToken){
        if(userData.type === 'admin'){
            return Navigate({ to:"/home" })
        }else{
            return Navigate({ to:'/player' })
        }
    }

    return props.children
}

export const OnlyPlayers = (props: any) => {
    const { userData } = useContext(AppContext)
    if(userData.type === 'admin'){
        return Navigate({ to:"/home" })
    }
    return props.children
}

export async function GetToken () {
    const token = Cookies.get('token')
    return token
}

export async function GetHeaders() {

    const token = await GetToken()  
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    return headers
}