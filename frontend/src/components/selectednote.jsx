import React, { useEffect, useContext ,useState } from "react";
import { Backdrop, CircularProgress, setRef, } from "@mui/material";
import Note from "./note";
import axios from "axios";
import { myContext } from "./maincontainer";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence,motion} from "framer-motion";

 function SelectedNote(props){  
    const [notes,setnotes]= new useState([]);
    const [loading,setloading] = new useState(false); 
    const userData= JSON.parse(localStorage.getItem("userData"));
    const nav= useNavigate();
    const {_id}= useParams();
    const {refresh, setRefresh}= useContext(myContext);
    const expandnl= useSelector((state)=>state.shrinkKey);
    const lightTheme= useSelector((state)=>state.themeKey);
    const [bg, setbg] = useState(true);
    
    function changebg(){
        setbg(!bg);
    }

    if(!userData){
        console.log("user not authenticated");
        nav("/");
    }
    if (!_id) {
        console.log(" note ID is missing");
       
    }
    console.log("_id from params:", _id);

    const fetchthisnote= async(_id)=>{
        try {
            const config={
                headers:{
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${userData.data.token}`,
                    } 
            }
            setloading(true);
            const {data}= await axios.get(`/note/find/${_id}`, config);
            setnotes([...data]);
            console.log(notes);
            setloading(false);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        fetchthisnote(_id)
    },[_id]);

    const deletenote = async(id)=>{
        try {
            const config={
                headers:{
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
            setloading(true);
            const{data}= await axios.get(`/note/delete/${id}`,
            config);
            setnotes([...data]);

            
            setloading(false);
            setRefresh(!refresh);
            
            nav("/homes/welcome");
            
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <AnimatePresence>
        <motion.div className={"selectednote "+(lightTheme?"":"snc ")+(expandnl?"shrink ":"expandnl")}
        initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.5",}}>
            {loading?
            <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color="secondary" />
            </Backdrop>
            : notes.map((noteitem, index) =>{
                return <Note key={index} id={noteitem._id} title={noteitem.title} content={noteitem.content} ondelete={deletenote} setRefresh={setRefresh} />;
           })}
            
        </motion.div>
        </AnimatePresence>
    );
 }

 export default SelectedNote;
