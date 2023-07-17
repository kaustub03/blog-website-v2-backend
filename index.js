import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://kaustubsreekrishnan:V2yq3HekShhZENra@cluster0.ls3rywz.mongodb.net/?retryWrites=true&w=majority')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

const postSchema = {
    title : String,
    content : String
}
const Post = mongoose.model("Post",postSchema)

app.get('/', req,res => res.send('Hello World'))

app.listen(process.env.PORT || 3000, () => console.log(`Server running on ${process.env.PORT || 3000}`))