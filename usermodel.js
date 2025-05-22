const mongoose = require('mongoose');
const usermodel = new mongoose.Schema(
    {

        amount:{
            type:int
        },
        types:{
            type:String
        },
        category:{
            type:String
        }
        
    }
);

const user = mongoose.model("User",usermodel);

module.exports(user);