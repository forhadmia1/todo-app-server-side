const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mtvmj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("todo-list").collection('todo');
        console.log("connected")

        app.post('/addTask', async (req, res) => {
            const task = req.body;
            const result = await todoCollection.insertOne(task)
            res.send(result)
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('todo app runing')
})

app.listen(port, () => {
    console.log('listening port', port)
})