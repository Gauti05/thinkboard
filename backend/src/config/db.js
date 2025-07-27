const mongoose = require('mongoose')

const connectdb = async ()=>{
    try{
 await mongoose.connect(process.env.MONGO_URI)
 console.log("mongodb connected-succesfully")
    }
    catch(err){
console.log("error in connecting", err)
process.exit(1) //exit with failure
    }
}

module.exports = connectdb