const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const bookSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

//collection will have a name "books" b small and plural
module.exports=mongoose.model("Book",bookSchema)