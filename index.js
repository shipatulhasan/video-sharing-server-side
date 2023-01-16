const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
dotenv

// middleware

app.use(express.json())
app.use(cors())

// initialization
app.get('/',(req,res)=>{
    res.send('bubu from node')
})

// mongodv




// listening 
app.listen(port,()=>{
    console.log(`listening from ${port}`)
})