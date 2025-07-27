const mongoose = require('mongoose')

//create a schema
//model based of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    
}, {timestamps:true}) //created-at, updated-at

const Note = mongoose.model("Note", noteSchema)

module.exports = Note