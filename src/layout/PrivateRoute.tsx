//THIS IS UNUSED TO BE REMOVED ON THE NEXT PUSH, IF YOU SEE IT HERE PLEASE REMOVE OR INGONRE

import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useToast from '../hooks/useToastify'
import { getUser } from '../utils/extraFunction'

type Prop = React.PropsWithChildren<{}>
const PrivateLayoutRoute = ({children}:Prop) => {
    const location = useLocation()
    const user = getUser()
    const {notify} = useToast()
    if(!user) {
        notify('please login','error')
        return <Navigate to={"/login"} state={{ from: location.pathname }}/>
    }
    return <>
        {children}
    </>
}

export default PrivateLayoutRoute