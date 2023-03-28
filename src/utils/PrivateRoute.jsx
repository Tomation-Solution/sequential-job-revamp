//THIS IS UNUSED TO BE REMOVED ON THE NEXT PUSH, IF YOU SEE IT HERE PLEASE REMOVE OR INGONRE

import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const PrivateRoute = ({type}) => {
    const location = useLocation()
    if(!type) {
        return <Navigate to={"/login"} state={{ from: location.pathname }}/>
    }
    return <Outlet />
}

export default PrivateRoute