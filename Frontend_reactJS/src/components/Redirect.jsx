import React,{useEffect} from "react"
import {useHistory,useLocation,Redirect} from "react-router-dom"
import { AddToken } from "../redux/actions";
import {useDispatch,useSelector } from "react-router"

export default function RedirectRoute(){
    const location = useLocation();
    let token=location.search
    token=token.substring(1)
    console.log('token:', token)

    return(
        <>
        <h1>{token}</h1>
        </>
        // <Redirect to="/" />
    )
}