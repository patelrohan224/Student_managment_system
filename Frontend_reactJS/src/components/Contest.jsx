import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./navbar.css"
export default function Contest({e,setforceUpade,forceUpade,togleLogin}){
    const {title,type,deadline,time,tags}=e
    const [error,seterror]=useState(false)
    const [load,setLoad]=useState(false)
    const {token}=useSelector(state=>state.Auth)
    async function deleteContest(){
        setLoad(true)
        try {
            
            // await axios.delete(`http://localhost:2345/admin/contestRemove/${e._id}`,{ headers: {
          await axios.delete(`https://ssmgmntsystm.herokuapp.com/admin/contestRemove/${e._id}`,{ headers: {
              'Authorization': 'Bearer ' + token
            }})
            setLoad(false)
            setforceUpade(forceUpade+1)
            seterror(false)
        } catch (error) {
            console.log("add stdt",error);
            setLoad(false)
            seterror(true)
        }
    }

    return(  load?
      <><p>Loading...</p></> : error ? <><p>Something went wrong</p></>
      : 
        <>
            <div className="conts-div">
                <div className="cont-left">
                <p className="type">{type}</p>
                <p className="title">{title}</p>
                <p className="deadline">{deadline}</p>
                </div>
                <div className="cont-right">
                    <p className="time">{time}</p>
                    <p className="tag">{tags?.map((e)=>e)}</p>
                    <div style={{float: 'right',padding:"3% 0%"}}>
                  {!togleLogin?<Button onClick={()=>{
                        deleteContest()
                    }} variant="outlined">Remove</Button>:""}
                    </div>
                </div>
            </div>
        </>
    )
}