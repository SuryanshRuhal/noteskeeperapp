const mongoose= require("mongoose");

const noteModel= mongoose.Schema(
    { 
    writer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title :{
        type: String,
        trim: true,
    },
    content:{
        type: String,
        trim: true,
    },
},{
    timestamp: true,
});

const Note= mongoose.model("Note", noteModel);
module.exports= Note;