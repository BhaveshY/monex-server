const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://vipulrpatil:onayeinsaan@leveling.b4twip1.mongodb.net/monex?retryWrites=true&w=majority';

mongoose.connect(dbURI).then((result) => {
    console.log('Connected to DB');
    app.listen(3333, () => console.log('Server listening on port 3333.'))
}).catch((err) => console.log(err))

const Blog = require('./models/blog')
const Transaction = require('./models/transaction')

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/transactions', (req, res) => {
    Transaction.find().then((result) => {
        res.send(result)
    }).catch(err => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.send(result)
    }).catch((err) => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})



