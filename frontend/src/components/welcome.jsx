import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import welcomeimg from "./welcome.jpg";
import welcomeimg2 from "./welcome2.jpg";
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import { useSelector } from "react-redux";
import { AnimatePresence,motion } from "framer-motion";



function Welcome(){
    const expandnl= useSelector((state)=>state.shrinkKey);
    const lightTheme= useSelector((state)=>state.themeKey);
    return(<AnimatePresence>
        <motion.div className={"welcomepage "+(expandnl?"shrink ":"expandnl ")+(lightTheme?"":"welcomedark")}
        initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.3",}}>
            <div className="blur"></div>
      {/* <img className="wimage" src={welcomeimg}/> */}
      
        </motion.div>
        </AnimatePresence>
    );

}

export default Welcome;