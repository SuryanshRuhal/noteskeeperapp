const { response } = require("express");
const UserModel =require("../modals/user")
const expressAsyncHandler = require("express-async-handler");
const generatetoken=require("../config/generatetoken");


const registercontroller = expressAsyncHandler(async(req,res)=>{
    console.log(req.body);
    const { fname, lname, username, email, password }= req.body;

    if( !fname || !lname|| !username || !email || !password){
        // res.send(400);
         throw Error("All Fields are required!");
     }
 
    const userexist = await UserModel.findOne({email});
    if(userexist){
        //res.send(405);
        throw new Error("User Already Exist");
    }

    const usernameexist= await UserModel.findOne({username});
    if(usernameexist){
       // res.send(406);
        throw new Error("UserName Already Taken");
    }

    const user = await UserModel.create({fname,lname,username,email,password});
    if(user){
        res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            username:user.username,
            email:user.email,
            token: generatetoken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Registration Error");
      }
});

const logincontroller = expressAsyncHandler(async (req,res)=>{
    const { email, password }= req.body;
    const user= await UserModel.findOne({email});
    if(user && await user.matchPassword(password)){
        const response={
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            email: user.email,
            token: generatetoken(user._id),
        }
       
        res.json(response);
    } else{
        res.status(401);
        throw new Error("Incorrect username or password");
    }
})
module.exports={
    registercontroller,
    logincontroller,
};