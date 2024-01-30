const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// 


//! Middlewares
app.use(cors());
app.use(express.json());


// DataBase



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.3frzyej.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //! Database collection
    const menuCollection = client.db('bossDB').collection('menu');
    const reviewCollection = client.db('bossDB').collection('review');


    // Get menu data
    app.get('/menu', async (req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result);
    })

    // Get review data
    app.get('/review', async (req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result)
    })








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Server Running');
})
app.listen(port, () => {
    console.log(`running on ${port}`);
})