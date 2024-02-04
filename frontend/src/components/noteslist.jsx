import React, {useEffect,useContext, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import { IconButton, useThemeProps } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Fab } from "@mui/material";
import { Backdrop, CircularProgress, } from "@mui/material";
import Noteitem from "./noteitem";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import { myContext } from "./maincontainer";
import {toggletheme} from "../features/toggletheme";
import { refreshsidebarFun } from "../features/sidebarrefresh";
import { shrinksidebar } from "../features/shrink";
import { AnimatePresence,motion } from "framer-motion";




function Notelist(){
    const nav= useNavigate();
    const [notes, setnotes]= useState([]);
    const [loading,setloading] = useState(false);
    const userdata= JSON.parse(localStorage.getItem("userData"));
    const [shrink,setshrink]= useState(false);
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themeKey);
    const expandnl= useSelector((state) => state.shrinkKey);
    
    const { refresh, setRefresh } = useContext(myContext);
    const c= lightTheme?"":"dark";

    if(!userdata){
        console.log("user not authenticated");
        nav("/");
    }

    const fetchlist= async(newnote)=>{
        try {
            
            const config={
                headers:{
                    "Content-Type" : "Application/json",
                  Authorization: `Bearer ${userdata.data.token}`,
              }
            }
        
            setloading(true);
            const {data}= await axios.get(`/note/${userdata.data._id}`, config);
            setnotes([...data]);
            console.log(notes);
            setloading(false);

        } catch (error) {
            console.log("oye m to tujh p mar gya oye");
        }
    }
    useEffect(
        ()=>{
            fetchlist()
        }
    ,[])

    

    return(
        <AnimatePresence>
        <motion.div className={"notelistmaincontainer " +(expandnl?"expandnl ":"shrinknl ")+(lightTheme?"":"darknl ")}
        initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.3",
        }}>
            
            <div className="nom">
                <motion.div className="brandbar "initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.3",}} >
                <Tooltip title={(expandnl?"container":"notelist")}>
                <IconButton onClick={()=>{dispatch(shrinksidebar())}}>
                <MenuIcon className={"icon menu "+(lightTheme?"":"dark ")}/>
               </IconButton>
               </Tooltip>
               <div className={"brand "+(lightTheme?"":"dark ")+(expandnl?"":"shrinkbrand ")}>
               <h1> 
                <ElectricBoltRoundedIcon className={"icon "+(lightTheme?"":"dark")} />
                <a>Avadhya Vichinta</a></h1>
                </div>
            </motion.div>
            <motion.div className={"iconlist "+ (lightTheme?"":"dark darkb ")+(expandnl?"expand ":"shrink ")}
            initial={{opacity:0,scale:0}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0}}
            transition={{
                ease:"anticipate",
                duration:"0.3",}}>
                <IconButton onClick={()=>{dispatch(toggletheme())}}>
                {
                    lightTheme? <DarkModeIcon className={"icon "+(lightTheme?"":"dark")}/>:<LightModeIcon className={"icon "+(lightTheme?"":"dark")}/>
                }
                </IconButton>
               <IconButton>
               <SearchIcon className={"icon "+(lightTheme?"":"dark")}/>
               </IconButton>
                <TextField  className={"searchbar "+(lightTheme?"":"dark")} fullWidth label="Search" InputLabelProps={{
    className:c,
  }}  InputProps={{className:c}} id="searchbar"  />
            
            </motion.div>
            <div className={"nome "+(expandnl?"expandnl ":"shrink ")}>
            <div className={"notelist "+(lightTheme?"":"dark darkborder")}>
                {loading?
                <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="secondary" />
                </Backdrop>
                :
                notes.map((noteitem,index)=>{
                    return  <Noteitem key={index} id={noteitem._id} title={noteitem.title} content={noteitem.content} />
                  })
                }
            </div>
            <motion.div whileHover={{scale:1.02}} >
            <Fab className={"b btt "+(lightTheme?"":"darkbu")} type="submit" onClick={()=>{
                dispatch(shrinksidebar());
                nav("create");
            }} >
                    <AddCircleOutlineIcon/>
            </Fab>
            </motion.div>
            </div>
            </div>
        </motion.div>
        </AnimatePresence>
    );

}

export default Notelist;