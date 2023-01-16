const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()

// middleware

app.use(express.json())
app.use(cors())

// initialization
app.get('/',(req,res)=>{
    res.send('bubu from node')
})

// mongodv


const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
    try{
        const usersCollection = client.db("videoSharing").collection("users")
        const productsCollection = client.db("videoSharing").collection("products")
        const commentsCollection = client.db("videoSharing").collection("comments")
        const likesCollection = client.db("videoSharing").collection("likes")

        // get user role


        app.get('/user/:email',async(req,res)=>{
            const email = req.params.email
            const filter = {email:email}
            const user = await usersCollection.findOne(filter)
            if(user.role==='admin'){
                return res.send({isAdmin:true})
            }
            res.send({isAdmin:false})
        })

        // get product from database

        app.get('/product',async(req,res)=>{
            const result = await productsCollection.find({}).toArray()
            res.send(result)
        })
       
        app.get('/product/:id',async(req,res)=>{
            const id = req.params.id
            const filter = {_id:ObjectId(id)}
            const result = await productsCollection.findOne(filter)
            res.send(result)
        })

        // get comments

        app.get('/comments/:id',async(req,res)=>{
            const id = req.params.id
            const filter = {productId:id}
            const result = await commentsCollection.find(filter).toArray()
            res.send(result)
        })
        // get likes

        app.get('/likes/:id',async(req,res)=>{
            const id = req.params.id
            const filter = {productId:id}
            const result = await likesCollection.find(filter).toArray()
            res.send(result)
        })

        // post route

        app.post('/user',async(req,res)=>{
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        app.post('/product',async(req,res)=>{
            const product = req.body
            const result = await productsCollection.insertOne(product)
            res.send(result)
        })

        // comment post 
        app.post('/comment',async(req,res)=>{
            const comment = req.body
            const result = await commentsCollection.insertOne(comment)
            res.send(result)
        })
        // Like post 
        app.post('/like',async(req,res)=>{
            const like = req.body
            const result = await likesCollection.insertOne(like)
            res.send(result)
        })
    }
    finally{}
}
run().catch(console.dir)





// listening 
app.listen(port,()=>{
    console.log(`listening from ${port}`)
})