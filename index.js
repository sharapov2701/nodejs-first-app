const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const expressHandlebars  = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cartRoutes = require('./routes/cart')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express()

// app.engine('hbs', hbs.engine)
app.engine('hbs', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://admin:LhIMMwT5n9yr8dhh@cluster0.756jk.mongodb.net/shop'
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()