const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Posts = require('./models/posts');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

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
app.use(
    methodOverride('_method', {
        methods: ['GET', 'POST'],
    })
);

//ROUTES
app.get('/', postController.getMainPage);
app.get('/post/:id', postController.getPost);
app.post('/post', postController.createPost);
app.put('/post/:id', postController.updatePost);
app.delete('/post/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı...`);
});
