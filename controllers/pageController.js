const Posts = require('../models/posts');

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

exports.getEditPage = async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.render('edit', {
        post,
    });
};
