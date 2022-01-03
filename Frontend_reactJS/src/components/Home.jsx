import React, { useEffect, useState } from "react";
import "./navbar.css"
import {Button} from "@mui/material"
import {useLocation} from "react-router-dom"
import { AddToken, LogOut } from "../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import Addstudents from "./Addstudents";
import AddContest from "./Addcontest";
import ContestDiv from "./ContestDiv";
import StudentDiv from "./StudentDiv";

export default function Home(){
    const location = useLocation();
    let token=location.search
    let name=token.split("rohanEmail")
    token=name[0].substring(1)
    // console.log('token:', token)
    let dispatch =useDispatch()

    const [studentAdd,setstudentAdd]=useState(0)
    const [contestAdd,setcontestAdd]=useState(0)
    const [hover,sethover]=useState(false)
  

 
    const [togleLogin,setTogleLogin]=useState(true)
    const [studentAddflag,setstudentAddflag]=useState(false)
    const [contestAddflag,setcontestAddflag]=useState(false)
 
    const islogin=useSelector(state=>state.Auth.AuthReducer)
 
    const google_auth=()=>{
       
        // window.location.href = " http://localhost:2345/auth/google"
        window.location.href = "https://ssmgmntsystm.herokuapp.com/auth/google"
      }
      const logout=()=>{
        dispatch(LogOut())
        token=""
       
        // window.location.href = "http://localhost:2345/"
        window.location.href = "https://students-mng-rohanpatel.vercel.app/"
        
      }
    useEffect(() => {
        if(token!==""){
            dispatch(AddToken({token}))
            setTogleLogin(false)
        }
    },[togleLogin])   
    return (
        <>
        <div className="navbar">
            <img style={{height:"40px",width:"100px",float:"left"}} src="https://cdn-icons-png.flaticon.com/512/167/167708.png" alt="" />{togleLogin?<Button onClick={()=>{
            google_auth()
        }}   variant="text" style={{float:"right",color:"rgb(81 142 248)"}} >Signup/Login</Button>:""}
            {/* <Button variant="text" color="whit">Student managment system</Button> */}
            {togleLogin?
        <img onClick={()=>{
            google_auth()
        }} style={{height:"40px",width:"40px",float:"right",cursor:"pointer"}} src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="" />
            : 
            <Button onMouseEnter={()=>{
                sethover(true)
            }} onMouseLeave={()=>{
                sethover(false)
            }} onClick={logout} style={{float:"right"}} variant="contained">{!hover?name[1]:"Log out"}</Button>}
           {!togleLogin?
           <div>  <Button onClick={()=>{
                if(!togleLogin){
                    setstudentAddflag(!studentAddflag)
                    setcontestAddflag(false)
                }
            }} style={{float:"right",margin:"0% 1%"}} variant={!togleLogin?"contained":"outlined"}>Add Student</Button>
            &nbsp;
            <Button 
            onClick={()=>{
                if(!togleLogin){
                    setcontestAddflag(!contestAddflag)
                    setstudentAddflag(false)
                }
            }}

            style={{float:"right"}}  variant={!togleLogin?"contained":"outlined"}>Add Contest</Button></div>:"" }
        </div>
        {studentAddflag?<Addstudents
        studentAdd={studentAdd}  setstudentAdd={setstudentAdd}
         setstudentAddflag={setstudentAddflag}studentAddflag={studentAddflag} />:""}
        {contestAddflag?<AddContest 
        contestAdd={contestAdd} setcontestAdd={setcontestAdd}
        setstudentAddflag={setcontestAddflag}studentAddflag={contestAddflag} />:""}
        
        <div className="boddy-div" style={contestAddflag||studentAddflag?{opacity:".3"}:{opacity:"1"}}>
        <ContestDiv togleLogin={togleLogin} 
        contestAdd={contestAdd}  />
            <div className="mAin-contest">
            {!togleLogin? <StudentDiv  setstudentAdd={setstudentAdd}  togleLogin={togleLogin} studentAdd={studentAdd}  />: <p>Please Signup/Login</p>}
            </div>
            </div>
        </>
    )
}