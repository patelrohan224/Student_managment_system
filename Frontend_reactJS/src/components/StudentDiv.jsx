import { Button } from "@mui/material"
import axios from "axios"
import React,{ useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Student from "./Student";
export default function StudentDiv({togleLogin,studentAdd,setstudentAdd}){
    const [load2,setload2]=useState(false)
    const [error2,seterror2]=useState(false)
    const [forceUpade2,setforceUpade2]=useState(0)
    const [sudentData,setStudentData]=useState([])
    const [sortName,setsortName]=useState(false)
    const [sortAge,setsortAge]=useState(false)
    const {token}=useSelector(state=>state.Auth)
    useEffect(() => {
        async function getStudent(){
            setload2(true)
            try {
                // let student=await axios(`http://localhost:2345/admin/studentAll?name=${sortName?"1":"-1"}&age=${sortAge?"1":"-1"}`,
                    let student=await axios(`https://ssmgmntsystm.herokuapp.com/admin/studentAll?name=${sortName?"1":"-1"}&age=${sortAge?"1":"-1"}`,
                    { headers: {
                        'Authorization': 'Bearer ' + token
                      }})
                      if(student!==undefined){
                    console.log(student.data.students)
                    setStudentData(student.data.students)}
                    setload2(false)
                    seterror2(false)
            } catch (error) {
                seterror2(true)
                setload2(false)
                    console.log("Catch",error);
            }
        }
        getStudent()
    },[forceUpade2,sortAge,sortName,studentAdd])
    return(
        <div>
            {!togleLogin?<div className="contest3">
           
           <div>
            {sudentData!==undefined ?<div>
                <Button 
                onClick={()=>{
                    setsortName(!sortName)
                }} style={{margin:"1% 0%"}} variant="outlined">Sort name</Button>
                &nbsp;  
                <Button 
                onClick={()=>{
                    setsortAge(!sortAge)
                }} style={{margin:"1% 0%"}} variant="outlined">Sort age</Button>
                </div>:""}</div>
            </div>:""}
            {load2? <p>Loading...</p> : error2? <p>Something went wrong</p>:
            <div className="contest2">
            {togleLogin?
               ""
                :
                <div>
               
                {sudentData!==undefined?sudentData?.map((e)=>(
                    <Student e={e} key={e._id} setforceUpade2={setforceUpade2}
                    studentAdd={studentAdd} setstudentAdd={setstudentAdd}
                    forceUpade2={forceUpade2}/>
                    )):"No Student In List"
                }
                </div>
            }
         </div>}
         </div>
    )
}