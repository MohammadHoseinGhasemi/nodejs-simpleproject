//////////////////////////////////// Libraries //////////////////////////////

const Blog = require('../models/blog')

//////////////////////////////////// Blog Page Get //////////////////////////////

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((blogs) => {
            res.render('index', { title: 'All Blogs', blogs })
        })
        .catch((err) => console.log(err))
}

//////////////////////////////////// Blogs Details Page //////////////////////////////

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err);
        })
}

//////////////////////////////////// Create New Blog Get //////////////////////////////

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create New Blog' })
}

//////////////////////////////////// Create New Blog Post //////////////////////////////

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
}

//////////////////////////////////// Deleting Blog //////////////////////////////

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => console.log(err))
}

//////////////////////////////////// Exporting //////////////////////////////

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}