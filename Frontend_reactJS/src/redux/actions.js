import { ADDTOKEN,LOGOUT } from "./actiontypes";
export const AddToken=(data)=>{
    return{
        type:ADDTOKEN,
        payload:data
    }
}
export const LogOut=()=>{
    return{
        type:LOGOUT,
    }
}