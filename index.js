const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        // get product from database

        app.get('/product',async(req,res)=>{
            const result = await productsCollection.find({}).toArray()
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
    }
    finally{}
}
run().catch(console.dir)





// listening 
app.listen(port,()=>{
    console.log(`listening from ${port}`)
})