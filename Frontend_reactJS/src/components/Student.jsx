import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./navbar.css"
export default function Student({e,setforceUpade2,forceUpade2,setstudentAdd,studentAdd}){
    const {name,age,city,education,gender,contact}=e
    const [load,setLoad]=useState(false)
    const [error,seterror]=useState(false)
    const {token}=useSelector(state=>state.Auth)
    async function deleteStudent(){
      
        setLoad(true)
        try {
           
            // await axios.delete(`http://localhost:2345/admin/studentRemove/${e._id}`,{ headers: {
          await axios.delete(`https://ssmgmntsystm.herokuapp.com/admin/studentRemove/${e._id}`,{ headers: {
              'Authorization': 'Bearer ' + token
            }})
            setLoad(false)
            setforceUpade2(forceUpade2+1)
            setstudentAdd(studentAdd)
            seterror(false)
        } catch (error) {
            console.log("add stdt",error);
            setLoad(false)
            seterror(true)
        }
    }
    return(
        load?
      <><p>Loading...</p></> : error ? <><p>Something went wrong</p></>
      : 
        <>
            <div className="conts2-div">
                <div className="cont2-left">
                <p className="type">{name}</p>
                <p className="title">{age}-{gender}</p>
                <p className="deadline">{city}</p>
                </div>
                <div className="cont-right">
                    <p className="time">{education}</p>
                    <p className="tag">{contact}</p>
                <div style={{float: 'right',padding:"3% 0%"}}>
                    <Button onClick={()=>{
                        deleteStudent()
                    }} variant="outlined">Remove</Button>
                    </div> 
                </div>
            </div>
        </>
    )
}