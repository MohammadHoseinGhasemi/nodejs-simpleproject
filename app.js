//////////////////////////////////// Libraries //////////////////////////////
const express = require('express');
const __ = require("lodash/fp/__");
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blog-route')

//////////////////////////////////// EJS Config //////////////////////////////
app.set('view engine', 'ejs')

//////////////////////////////////// mongo db config //////////////////////////////
const dbURI = 'your own db cfg'
mongoose.connect(dbURI)
    .then((result) => app.listen(3003))
    .catch((err) => console.log(err))

//////////////////////////////////// Static Files //////////////////////////////
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//////////////////////////////////// Home Page Redirect //////////////////////////////
app.get('/', (req, res) => {
    res.redirect('/blogs')
})


//////////////////////////////////// About Page //////////////////////////////
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })

})

//////////////////////////////////// Use Route //////////////////////////////
app.use('/blogs', blogRoutes)

//////////////////////////////////// Not Found Page//////////////////////////////
// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
