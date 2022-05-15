const Posts = require('../models/posts');

exports.getMainPage = async (req, res) => {
    const posts = await Posts.find({});
    res.render('index', {
        posts,
    });
};

exports.getPost = async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.render('post', {
        post,
    });
    // console.log(post);
};

exports.createPost = async (req, res) => {
    await Posts.create(req.body);
    res.redirect('/');
};

exports.updatePost = async (req, res) => {
    const post = await Posts.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();

    res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
    await Posts.findByIdAndRemove(req.params.id);
    res.redirect('/');
};
