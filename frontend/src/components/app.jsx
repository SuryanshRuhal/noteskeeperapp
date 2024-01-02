import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import './styles.css';

function App(){

    return(
        <div  >  
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="home" element={<Home/>} />
        </Routes>
        </div>
    );

}
 
export default App;