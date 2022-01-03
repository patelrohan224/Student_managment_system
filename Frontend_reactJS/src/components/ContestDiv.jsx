import { Button } from "@mui/material"
import axios from "axios"
import React,{ useEffect, useState } from "react"
import Contest from "./Contest"
export default function ContestDiv({togleLogin,contestAdd}){
    const [contestData,setContestData]=useState([])
    const [load1,setload1]=useState(false)
    const [error1,seterror1]=useState(false)
    const [page,serPage]=useState(1)
    const [limit,serLimit]=useState(5)
    const [deadline,setdeadline]=useState(false)
    const [totalPage,setTotalpage]=useState(0)
    const [forceUpade,setforceUpade]=useState(0)
    useEffect(() => {
        async function getcontest(){
            setload1(true)
            try {
                
                // let contest=await axios(`http://localhost:2345/admin/contestAll?page=${page}&limit=${limit}&deadline=${deadline?"1":"-1"}`)
                let contest=await axios(`https://ssmgmntsystm.herokuapp.com/admin/contestAll?page=${page}&limit=${limit}&deadline=${deadline?"-1":"1"}`)
                    // console.log('contest.data.contest:', contest.data.contest)
                    if(contest!==undefined){
                  
                  
                    setTotalpage(contest.data.totalPages)
                    setContestData(contest.data.contest)
                    setload1(false)
                    seterror1(false)}
            } catch (error) {
                seterror1(true)
                setload1(false)
            }
        }
        getcontest()
    },[page,deadline,forceUpade,contestAdd])
    return (<>
       <div className="contest">
            {contestData!==undefined?<div>
                {/* <Button 
                onClick={()=>{
                    setdeadline(-1)
                }} style={{margin:"1% 0%"}} variant="outlined">Sort deadline</Button> */}
                &nbsp;  
                <Button 
                onClick={()=>{
                    setdeadline(!deadline)
                }} style={{margin:"1% 0%"}} variant="outlined">Sort deadline</Button>
                </div>:""}
                {load1? <p>Loading...</p> : error1? <p>Something went wrong</p>:
                <div>
                {contestData!==undefined?contestData?.map((e)=>(
                    <Contest e={e} key={e._id} setforceUpade={setforceUpade}
                    forceUpade={forceUpade}
                    togleLogin={togleLogin}/>
                )):"No Contest is available"}</div>
                }
                
                {contestData!==undefined? <div>
                    <Button disabled={page==0 || page==1} onClick={()=>{
                    serPage(page-1)
                }} variant="text">PREV</Button>  &nbsp;
                <Button disabled={page===totalPage}onClick={()=>{
                    serPage(page+1)
                }} variant="text">NEXT</Button></div>:""}
            </div>
            </>
    )
}