import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commentedOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    content:{
        type:String,
    }
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema);

export default Comment;