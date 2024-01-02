import React, { useState } from "react";
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import './styles.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, } from "@mui/material";
import Toaster from "./toaster";

//import { json } from "express";

function Login(){

    const [contact,Setcontact]= useState({
        fname:"",
        lname:"",
        username:"",
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const [pasword,setpassword]= useState(true);
    const [loading,setloading]= useState(false);
    const [signup, setsignup]=useState(true);

    const [logInStatus, setLogInStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState("");

    function changelogin(){
        setsignup(!signup);
    }

    function handleclick(){
        setpassword(!pasword);
    }
    function changeto(event){
        const {name, value}= event.target;

        Setcontact(prevValue =>{
           return{
            ...prevValue,
            [name] :value,
           };
        });
    }

    const loginhandler = async(e)=>{
        e.preventDefault();
        setloading(true);
        try {
            const config= {
                headers:{
                "Content-type":"application/json",
                },
            };

            const response= await axios.post(
                "http://localhost:8080/user/login/",
                contact,
                config,
            );
            console.log(response);
            setLogInStatus({ msg: "Success", key: Math.random() });
            setloading(false); 
            localStorage.setItem("userData",JSON.stringify(response));
            navigate("/home");
             
        } catch (error) {
            setLogInStatus({
                msg: "Invalid User name or Password",
                key: Math.random(),
              });
            setloading(false);
        }
    };

    const signuphandler =async(e)=>{
        e.preventDefault();
        setloading(true);
        try {
            const config= {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response= await axios.post(
                "http://localhost:8080/user/register/",
                contact,
                config,
            );
            console.log("Login : ", response);
            setSignInStatus({ msg: "Success", key: Math.random() });
            setloading(false); 
            localStorage.setItem("userData",JSON.stringify(response));
            navigate("/home");
            
        } catch (error) {
            console.log(error);
      if (error.response.status === 405) {
        setLogInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setLogInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
            setloading(false); 
        }
    }

return ( 
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="secondary" />
    </Backdrop>
<section id="lgpage">
    <div>
    <div className="glowcontainer">
    <div className={!signup?"glow":"glowlg"}></div>
    </div>
<div className="lgcontainer">
    {!signup?(<h1>
      Hii {contact.fname} {contact.lname}
    </h1>):(<h1>
      Login
    </h1>)}

    {!signup ? (
    <form className="lgform">
        <input className="tl" name="fname" value={contact.fname} placeholder="First Name" onChange={changeto}/>
        <input className="tl" name="lname" value={contact.lname} placeholder="Last Name" onChange={changeto}/>
        <input className="tl" name="username" value={contact.username} placeholder="User-Name" onChange={changeto}/>
        <input className="tl"name="email" value={contact.email} placeholder="Enter your Email" onChange={changeto}/>
        <div>
        <input className="tl"name="password"  type={pasword? "password": 'text'} value={contact.password} placeholder="Password" onChange={changeto}/>
        <div className="eye">
           { pasword? (<VisibilitySharpIcon onClick={handleclick} />  ):
            (<VisibilityOffSharpIcon onClick={handleclick}/>)
             }
        </div>
        </div>
        <button className="button" onClick={signuphandler}>Signup</button>
        {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
    </form>):(<form className="lgform">
        <input className="tl"name="email" value={contact.email} placeholder="Enter your Email" onChange={changeto}/>  
        <div>
        <input className="tl"name="password"  type={pasword? "password": 'text'} value={contact.password} placeholder="Password" onChange={changeto}/>
        <div className="lgeye">
           { pasword? (<VisibilitySharpIcon onClick={handleclick} />  ):
            (<VisibilityOffSharpIcon onClick={handleclick}/>)
             }
        </div>
        </div>
        <button className="button" onClick={loginhandler}>Login</button>
        {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
    </form>)}
    {signup?(<div className="switchlogin">
      <p> Haven't any room for your Thoughts to hail? </p><a className="an" onClick={changelogin} >Signup</a>
    </div>):(<div className="switchlogin">
       <p>Got a Place? Then what are you waiting for, try it now! </p> <a className="an" onClick={changelogin} >Login</a>
    </div>)}
    
</div>

</div>
</section>
</>
);
}


export default Login ;