// const { default: Note } = require("../Models/Notes.js");+
const Note = require("../Models/Notes.js");

  const getAllNotes = async (req,res) =>{
   try{
   
    const notes = await Note.find().sort({createdAt:-1}); //newest first
    res.status(200).json(notes)
   } 
   catch(err){
    console.log("error is coming", err)
res.status(500).json({message:"internal server error"})
   }
}

const getAllNotesById  = async(req,res) =>{
  try {
    const note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({message:"no note found"})
    }

    res.status(200).json({
      message: "note with particular id found successfully",
      note: note
    });
  } catch (error) {
    console.log("error is coming", error)
    res.status(500).json({message:"internal server error"})
  }
}

 const postAllNotes = async(req,res) =>{
   try {
    const{title,content} = req.body;
    const note = new Note({title,content})
     const savedNotes = await note.save();
    res.status(201).json(savedNotes)

   } catch (error) {
    console.log("error in note creation", error)
    res.status(500).json({message:"internal server error"})
    
   }
}


 const updateNotes = async(req,res) =>{
   try {
    const{title,content} = req.body;

    const updatednotes =   await Note.findByIdAndUpdate(req.params.id,{title,content},{
        new:true,
    })
    if(!updatednotes){
        return res.status(404).json(updatednotes)
    }
    res.status(200).json({message:"note updated successfull"})
   } catch (error) {
     console.log("error in note updation", error)
    res.status(500).json({message:"internal server error"})
   }
}

 const deleteNotes = async(req,res) =>{
    try {
       
        const deletenotes = await Note.findByIdAndDelete(req.params.id)
        if(!deletenotes){
               return res.status(404).json(deletenotes)
        }
        res.status(200).json({message:"note deleted successfully"})
    } catch (err) {
        console.log("error in note deletion", err)
    res.status(500).json({message:"internal server error"})
    }
}

module.exports = {
    getAllNotes,
    postAllNotes,
    updateNotes,
    deleteNotes,
    getAllNotesById
}