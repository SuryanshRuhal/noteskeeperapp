const expressAsyncHandler = require("express-async-handler");
const User = require("../modals/user");
const Note = require("../modals/note");

const allnotes = expressAsyncHandler( async(req,res)=>{
    try {
        const notes=await Note.find({writer: req.params.userId}).populate("writer", "username fname lname email");
        res.json(notes);
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
const createnote = expressAsyncHandler(  async (req, res)=>{
    const {title, content}= req.body;

    if( !title|| !content ){
        res.send(400);
        console.log("Title and content are required.");
    }
    if (!req.user || !req.user._id) {
        return res.status(401).send("User not authenticated.");
       }

    var newnote = {
        writer: req.user._id,
        title: title,
        content : content,
    };

    try { 
        var note= await Note.create(newnote);
        console.log(note);
        
        note = await note.populate("writer", "username fname lname email");
        res.json(note);
        
    } catch (error) {
        res.status(401);
        throw new Error(error.message);
    }


});
const deletenote = async (req,res)=>{
    try {
        await Note.deleteOne({_id: req.params.noteId});
        res.json("");
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}


module.exports ={
    createnote, allnotes, deletenote
}