import React, { useEffect, useState } from "react";
//import ReactDOM from 'react-dom/client';
import Header from "./header";
import Footer from "./footer";
import { Backdrop, CircularProgress, } from "@mui/material";
import './styles.css';
import Note from "./note";
import Createarea from "./createarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home(){
    const [notes, setnotes]=useState([]);
    //const [newnotes, setnewnotes]=useState([]);
    const [loading, setloading]=useState(false);
    const userdata= JSON.parse(localStorage.getItem("userData"));
    const nav= useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if(!userdata){
        console.log("user not authenticated");
        nav("/");
    }

    const addnote = async(newnote)=>{
        
        try {

            const config={
                headers:{
                  "Content-Type" : "Application/json",
                Authorization: `Bearer ${userData.data.token}`,
            }
            };
            setloading(true);
            const {data} = await axios.get(`/note/${userData.data._id}`,config);

            console.log(data);
            // setnotes(()=>{
            //     return [ ...data, newnote];
            // });
            setnotes([...data]);
            console.log(notes);
            setloading(false);

        } catch (error) {
            console.log("oyo chalega anub");
        }
        
    };
    useEffect(()=>{addnote()},[]); 

    const deletenote= async(id)=>{
        try {
            const config={
            headers:{
                "Content-Type": "Application/json",
                Authorization: `Bearer ${userData.data.token}`,
                } 
            }
            setloading(true);
            const {data} = await axios.get(`http://localhost:8080/note/delete/${id}`,
            config);

            console.log(data);
            setnotes([...data]);
            console.log(notes);
            addnote()
            setloading(false);

        } catch (error) {
            console.log("Mera Mohan");
        }
    }

return ( 
<div>
    <Header />
    <h1 className="mh">Welcome to the thoughts' Castle of {userdata.data.fname} {userdata.data.lname}</h1>
    <Createarea onadd={addnote} />
    {loading?<Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="secondary" />
    </Backdrop>:
    notes.map((noteitem, index) =>{
         return <Note key={index} id={noteitem._id} title={noteitem.title} content={noteitem.content} ondelete={deletenote}/>;
    }) }
    <Footer />
</div>
);
}


export default Home;
