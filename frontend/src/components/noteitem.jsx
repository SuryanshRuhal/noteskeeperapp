import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Note from "./note";
import { useDispatch, useSelector } from "react-redux";
import { shrinksidebar } from "../features/shrink";
import {AnimatePresence, motion} from "framer-motion";



function Noteitem(props){
    const nav= useNavigate();
    const dispatch= useDispatch();
    const lightTheme= useSelector((state)=>state.themeKey);
    
   
    return(
        <AnimatePresence>
        <motion.div className={"noteit "+(lightTheme?"":"noteida")}
        whileHover={{scale:1.02}}
        initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.3",
        }}
        >
            <IconButton className="block" onClick={()=>{
                dispatch(shrinksidebar());
                nav(`note/${props.id}`);
            }}>
            <h1 className={"byheading taleft "+(lightTheme?"":"darkc")}>{props.title}</h1>
            <div className="stopit">
            <div className={"textshort "+(lightTheme?"":"darkc")}><p className=""> {props.content}</p></div>
            </div>
            </IconButton>
        </motion.div>
        </AnimatePresence>
    );
}

export default Noteitem;