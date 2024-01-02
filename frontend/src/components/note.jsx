import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";

 function Note(props){

    function handle(){
        props.ondelete(props.id);
    };
    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p> {props.content}</p>
            <Fab className="bd b" type="submit" onClick={handle}>
                <DeleteIcon/>
            </Fab>
        </div>
    );
 }

 export default Note;
