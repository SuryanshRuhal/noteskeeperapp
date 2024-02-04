import React,{ createContext,useState, useEffect} from "react";
import "./newstyles.css";

import { Outlet } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";
import Notelist from "./noteslist";

import Welcome from "./welcome";
import Createarea from "./createarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectedNote from "./selectednote";
export const myContext = createContext();



function MainContainer() {
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
          const {data} = await axios.get(`http://localhost:8080/note/${userData.data._id}`,config);

          console.log(data);
          // setnotes(()=>{
          //     return [ ...data, newnote];
          // });
          setnotes([...data]);
          nav("/homes/welcome");
          console.log(notes);
          setloading(false);

      } catch (error) {
          console.log("chai peene chalega anub");
      }
      
  };
  useEffect(()=>{addnote()},[]); 
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);


  return <div className={"mcontainer "+ (lightTheme?"":"darkmb ")}>
     <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }} >
     <Notelist/>
      <Outlet/>
     </myContext.Provider>
    {/* <SelectedNote /> */}
    {/* {<Createarea onadd={addnote}/>} */}
    {/* {<Welcome/>} */}
  </div>;
}

export default MainContainer;