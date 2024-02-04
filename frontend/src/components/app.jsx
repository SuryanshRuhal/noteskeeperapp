import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";

import Note from "./note";

import './styles.css';
import MainContainer from "./maincontainer";
import Createarea from "./createarea";
import SelectedNote from "./selectednote";
import Welcome from "./welcome";

function App(){

    return(
        <div className="App" >  
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="homes" element={<MainContainer/>} >
                  <Route path="welcome" element={<Welcome/>} />
                  <Route path="create" element={<Createarea/>} />
                  <Route path="note/:_id" element={<SelectedNote/>} />
            </Route>
        </Routes>
        </div>
    );

}
 
export default App;