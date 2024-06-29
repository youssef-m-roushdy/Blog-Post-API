const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config()

const app = express()



mongoose.connect(process.env.DBURI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("App is listening on port 8080 & connected to DB")
    })
}).catch((err) => {
    console.log(err)
})


//register view engine
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

//including static files
app.use(express.static('public'))

app.get('/', (req, res) => {

    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: "Home" })
})

