const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c4bol.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const BlogsCollection = client.db("Blogger-diaries").collection("blogs");

  app.post('/blogs', (req, res) => {
    const addBlog = req.body
    BlogsCollection.insertOne(addBlog)
      .then(result => {
        res.send(result)
        console.log(result);
      })
  })

  app.get('/allBlog', (req, res) => {
    BlogsCollection.find({})
      .toArray((err, blogDetails) => {
        res.send(blogDetails)
      })
  })

});


app.listen(port)
