import express from 'express'
import mongoose from 'mongoose'
import Videos from './dbModel.js'
import Cors from'cors'

mongoose.set('strictQuery', true)
const app = express()
const port = process.env.PORT || 9000
const connection_url="mongodb+srv://Gowslaya:Lovely@cluster0.0lnvxrm.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(Cors())

app.get("/", (req, res)=> res.status(200).send("TikTok mern clone"))

app.post('/v2/posts',(req,res)=>{
    const dbVideos = req.body
    console.log(Videos)
    Videos.create(dbVideos,(err,data)=>{
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})


app.get('/v2/posts', (req,res)=>{
    Videos.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.listen(port, ()=>console.log(`listening on local host: ${port}`))