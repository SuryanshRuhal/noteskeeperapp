import React, { useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";
import { myContext } from "./maincontainer";
import { AnimatePresence,motion } from "framer-motion";
import { useSelector } from "react-redux";
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { IconButton, useThemeProps } from "@mui/material";

 function Note(props){   
    const { refresh, setRefresh}= useContext(myContext);
    const [bg, setbg] = useState(true);
    
    function changebg(){
        setbg(!bg);
    }
    const lightTheme= useSelector((state)=>state.themeKey);
    function handle(){
        props.ondelete(props.id);
    };
    return(
        <AnimatePresence>
        <motion.div className={"note "+(lightTheme?"":"notedark "+(bg?"notedark ":"darkbg2 "))}>
            <IconButton color="secondary" aria-label="" onClick={changebg}>
                <FilterVintageIcon className={(lightTheme?" l":"bctag")} />
            </IconButton>
            <div className={"notep "+(lightTheme?"":"notepdark")}>
            <motion.div whileHover={{scale:1.02}} >
            <Fab className={"bd b "+(lightTheme?"":"darkbu")} type="submit" onClick={()=>{handle();
            setRefresh(!refresh);
            }}>
                <DeleteIcon/>
            </Fab>
            </motion.div>
            <h1 className={"mheading "+(lightTheme?"":"darkc")}>{props.title}</h1>
            <p className={" "+(lightTheme?"":"darkc")}> {props.content}</p>
            </div> 
        </motion.div>
        </AnimatePresence>
    );
 }

 export default Note;
