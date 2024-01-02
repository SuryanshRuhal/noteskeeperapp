const mongoose= require ("mongoose"); 
const bcrypt= require("bcryptjs");

const userModel =mongoose.Schema(
    {
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},
{
    timeStamp: true,
  }
);
  

userModel.methods.matchPassword= async function(enterpassword){
    return await bcrypt.compare(enterpassword ,this.password);
}
userModel.pre("save",async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);

});

const User= mongoose.model("User", userModel);
module.exports = User;