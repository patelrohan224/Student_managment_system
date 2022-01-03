import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./navbar.css"
import {
    TextField,
    Button,
    FormHelperText,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    MenuItem,
    Select,
    IconButton,
    FormControl
  } from "@mui/material";
  import axios from "axios";
  const initstate = {
    name: "",
    age: Number(""),
    contact: Number(""),
    education: "",
    city: "",
    gender: ""
  };
export default function Addstudents({setstudentAddflag,studentAddflag,setstudentAdd,studentAdd}){
  
    const[load,setLaod]=useState(false)


    const {token}=useSelector(state=>state.Auth)
    const [name,setName]=useState("")
    const [Name_flag,setName_flag]=useState(false)
    const [age,setage]=useState("")
    const [Age_flag,setAge_flag]=useState(false)
    const [city,setcity]=useState("")
    const [city_flag,setcity_flag]=useState(false)
    const [education,seteducation]=useState("")
    const [Education_flag,setEducation_flag]=useState(false)
    const [gender,setgender]=useState("")
    const [genderflag,setgenderflag]=useState(false)
    const [contact,setcontact]=useState("")
    const [phoneflag,setphoneflag]=useState(false)

    const validation = () => {
        if (name === "") {
          setName_flag(true);
          return false
        } else {
          setName_flag(false);
        }
        if (age === "") {
            setAge_flag(true);
            return false
          } else {
            setAge_flag(false);
          }
    
       
          if (city === "") {
            setcity_flag(true);
            return false
        } else {
          setcity_flag(false);
        }
        if (education === "") {
          setEducation_flag(true);
          return false
        } else {
          setEducation_flag(false);
        }
       
          if (gender === "") {
            setgenderflag(true);
            return false
        } else {
          setgenderflag(false);
        }
        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(contact)) {
          setphoneflag(true);
          return false
        } else {
          setphoneflag(false);
        }
       return true;
      };

      async function addstudent(){
          console.log(name,age,gender,city,education,contact);
          setLaod(true)
          try {
            
            // await axios.post("http://localhost:2345/admin/studentAdd",{
            await axios.post("https://ssmgmntsystm.herokuapp.com/admin/studentAdd",{
              "name":`${name}`,
              "city":`${city}`,
              "age":`${age}`,
              "education":`${education}`,
              "gender":`${gender}`,
              "contact":`${contact}`
          },{ headers: {
                'Authorization': 'Bearer ' + token
              }})
              setLaod(false)
              setstudentAddflag(!studentAddflag)
              setstudentAdd(studentAdd+1)
          } catch (error) {
              console.log("add stdt",error);
              setLaod(true)
          }
      }


    return (
      load?
      <> <div className="addst"><p>Loading...</p></div></>
      : 
        <>
            <div className="addst">
               <div className="close">
              <img onClick={()=>{
                setstudentAddflag(!studentAddflag)
              }} style={{height:"20px",width:"20px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1024px-OOjs_UI_icon_close.svg.png" alt="" />
          </div>
                <div className="addst-dv">
                <TextField
              error={Name_flag}
              label={Name_flag ? "error" : "Full Name"}
              helperText={Name_flag ? "Name is required" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            />
             <TextField 
              error={Age_flag}
              label={Age_flag ? "error" : "Age"}
              helperText={Age_flag ? "age is required" : ""}
              value={age}
              onChange={(e) => {
                setage(e.target.value);
              }}
              type="number"
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            />
                </div>
                <div className="addst-dv">
                <TextField
              error={city_flag}
              label={city_flag ? "error" : "City"}
              helperText={city_flag ? "city is required" : ""}
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            />
             <TextField
              error={Education_flag}
              label={Education_flag ? "error" : "Education"}
              helperText={Education_flag ? "education is required" : ""}
              value={education}
              onChange={(e) => {
                seteducation(e.target.value);
              }}
              type="text"
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            />
                </div>
                
                <div className="addst-dv">
                <FormControl
              error={genderflag}
              // sx={{ m: 0, minWidth: 210 }}
              className="name_inpt"
            >
             <InputLabel id="demo-simple-select-helper-label" size="small">
                {genderflag ? "error" : "Gender"}
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gender}
                label={genderflag ? "error" : "Gender"}
                onChange={(e)=>{
                    console.log('e.target.value:', e.target.value)
                    setgender(e.target.value);
                }}
              >
                <MenuItem value={""} size="small">
                  <em>Select Education</em>
                </MenuItem>
                <MenuItem size="Male" value={"Male"}>
                Male
                </MenuItem>
                <MenuItem size="Female" value={"Female"}>
                Female
                </MenuItem>
               
              </Select>
              <FormHelperText>
                {genderflag ? "Gender Required" : ""}
              </FormHelperText>
            </FormControl>
             <TextField
              error={phoneflag}
              label={phoneflag ? "error" : "Contact No"}
              helperText={phoneflag ? "contact is required" : ""}
              value={contact}
              onChange={(e) => {
                setcontact(e.target.value);
              }}
              type="number"
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            />
                </div>
                 <Button variant="contained" 
                 onClick={()=>{
                     validation()
                     if( validation())
                   {
                      addstudent()
                      console.log("-------");
                   }
                 }}>Add Student</Button>
            </div>

        </>
    )
}