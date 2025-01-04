const mongoose = require('mongoose');

function dbConnect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((e)=>{
        console.log("error occured while Connecting to DB!!!")
    })
}

module.exports=dbConnect;