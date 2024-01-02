import React, { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Fab } from "@mui/material";
import axios from "axios";

function Createarea(props){

    const [textinput, setinput]=useState({
        title:"",
        content:"",
    });
    const [notes, setnotes]=useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    function writenote(event){
        const {name,value}= event.target;
        setinput(prevNote =>{
            return{
                ...prevNote,
                [name]: value,
            }
        });
    }

    const sendnote= async(event)=>{
        event.preventDefault();
        
        
            try {
                const config= {
                    headers:{
                        "Content-Type":"Application/json",
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }

                const {data} = await axios.post(
                    
                    "http://localhost:8080/note",
                    textinput,
                    config
                );
                console.log(data);
                props.onadd(textinput);
                 setinput({ 
                  title:"",
                  content:"",
                   });
                   setnotes([...notes,data]);

            } catch (error) {
                console.log("oye mohan");
            }
       
        
    }

    return(
        <div className="createarea">
            <form className="noteform">
                <input className="t" name="title" value={textinput.title} onChange={writenote} placeholder="Title" />
                <input className="c" name="content" value={textinput.content} onChange={writenote} placeholder="Put your desires into words here" />
                
                <Fab className="b" type="submit" onClick={sendnote}>
                    <AddCircleOutlineIcon/>
                </Fab>
            </form>
        </div>
    );
}


export default Createarea;
