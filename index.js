//jshint esversion:6

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import cors from 'cors'
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://kaustubsreekrishnan:V2yq3HekShhZENra@cluster0.ls3rywz.mongodb.net/?retryWrites=true&w=majority')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static("public"))

// const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
// const contactContent = ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const postSchema = {
    title : String,
    content : String
}

const Post = mongoose.model("Post",postSchema)

app.get('/', async (req,res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
        // console.log(posts)
    } catch(err) {
        console.log(err)
    }
})

// app.get('/posts',(req,res) => res.redirect('/'))

// app.get('/about',(req,res) => res.status(200).json(aboutContent))

// app.get('/contact',(req,res) => res.status(200).json(contactContent))

app.post('/compose',(req,res) => {
    console.log(req.body)
    const post = new Post({
        title : req.body.postTitle,
        content : req.body.postContent
    })
    try {
        post.save()
        // console.log(post)
        // res.redirect('/')
    } catch(err) {
        console.log(err)
    }
})

app.get('/posts/:postID',async (req,res) => {
    const postID = req.params.postID
    try {
        console.log(postID)
        foundPost = await Post.findById(postID)
        foundPost.save()
        // res.status(200).json(foundPost)
        console.log(foundPost)
    } catch(err) {
        console.log(err)
    }
})

app.use(methodOverride('_method'));

app.delete('/posts/:postID',async (req,res) => {
    const postID = req.params.postID
    try {
        await Post.deleteOne({_id : postID})
        console.log(`Deleted ${postID}`)
        res.redirect('/')
    } catch(err) {
        console.log(err)
    }
})

app.listen(process.env.PORT || 3001, () => console.log(`Server running on ${process.env.PORT || 3001}`))