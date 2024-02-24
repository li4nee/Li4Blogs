import mongoose, { Schema, SchemaType } from "mongoose";
import path from "path";
const blogSchema = mongoose.Schema({
title:{
    type:String,
    required:true
},
body:{
    type:String,
    required:true
},
coverImageUrl:{
    type:String,
    default:path.resolve("/public/images/blog_default.webp")
},
creator:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
}
},{
    timestamps:true
})
const Blog = mongoose.model("Blog",blogSchema);

export default Blog;