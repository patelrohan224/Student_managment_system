import { ADDTOKEN ,LOGOUT} from "./actiontypes";

const init={
    isLogin:false,
    token:"",
    
  };
export const AuthReducer=(state=init,{type,payload})=>{
    switch (type) {
        case ADDTOKEN:
            return {...state,token:payload.token,isLogin:true};
            case LOGOUT:
                return {...state,token:"",isLogin:false};
        default:
            return {...state}
    }
}