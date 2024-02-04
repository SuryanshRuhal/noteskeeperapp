import React, { useState, useContext} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { myContext } from "./maincontainer";
import TextField from '@mui/material/TextField';
import { AnimatePresence,motion } from "framer-motion";
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { IconButton, useThemeProps } from "@mui/material";


function Createarea(props){
    
    const [textinput, setinput]=useState({
        title:"",
        content:"",
    });
    const [notes, setnotes]=useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    const { refresh, setRefresh } = useContext(myContext);
    const lightTheme= useSelector((state)=>state.themeKey);
    const expandnl= useSelector((state)=>state.shrinkKey);
    const [bg, setbg] = useState(true);
    const c= lightTheme? "":"darkc ";
    function changebg(){
        setbg(!bg);
    }

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
        // event.preventDefault();
        
        
            try {
                const config= {
                    headers:{
                        "Content-Type":"Application/json",
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }

                const {data} = await axios.post(
                    
                    "/note",
                    textinput,
                    config
                );
                console.log(data);
                if (typeof props.onadd === "function") {
                    props.onadd(textinput);
                  }
              
                 setinput({ 
                  title:"",
                  content:"",
                   });
                   setnotes([...notes,data]);
                   

            } catch (error) {
                console.log(error);
            }
       
        
    }

    return(
        <AnimatePresence>
        <motion.div className={"welcomemaincontainer "+(lightTheme?"":"wmc "+(bg?"wmc ":"darkbg2 "))+(expandnl?"shrink ":"expandnl ")} initial={{opacity:0,scale:0}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0}}
        transition={{
            ease:"anticipate",
            duration:"0.3",}}>
            
            <div className="createarea">
            <IconButton color="secondary" aria-label="" onClick={changebg}>
                <FilterVintageIcon className={(lightTheme?" l":"bctag")} />
            </IconButton>
            <form className="noteform ">
            <motion.div whileHover={{scale:1.01}} >
                <Fab className={"cabtt b "+(lightTheme?"":"darkbu")} type="submit" onClick={()=>{
                    sendnote();
                setRefresh(!refresh)}}
                >
                    <AddCircleOutlineIcon/>
                  </Fab>
                  </motion.div>
                  
                  
                <input className={"t "+ (lightTheme?"":"dark")} name="title" value={textinput.title} onChange={writenote} placeholder="Title" />
                    <TextField
                     id="standard-multiline-static"
                     label="Content"
                     className="c" name="content" value={textinput.content} onChange={writenote} placeholder="Put your desires into words here"
                     multiline
                     rows={60}
                     defaultValue="Default Value"
                     InputLabelProps={{
                        className:c,
                      }}  InputProps={{className:"inputl "+c}}
                     variant="standard"
                     />
                  
            </form>
         
        </div>
        
        </motion.div>
        </AnimatePresence>
        
    );
}


export default Createarea;
