const Posts = require('../models/posts');

exports.getMainPage = async (req, res) => {
    var page = req.query.page || 1;
    const postPerPage = 3;

    const totalPost = await Posts.find().countDocuments();
    const posts = await Posts.find({})
        .sort('-dateCreated')
        .skip((page - 1) * postPerPage)
        .limit(postPerPage);

    res.render('index', {
        posts: posts,
        current: page,
        pages: Math.ceil(totalPost / postPerPage),
    });
    // const posts = await Posts.find({}).sort('-dateCreated');
    // res.render('index', {
    //     posts,
    // });
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
