const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Posts = require('./models/posts');

const app = express();

//DB CONNECTION
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
    const posts = await Posts.find({});
    res.render('index', {
        posts,
    });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/posts', async (req, res) => {
    await Posts.create(req.body);
    res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı...`);
});
