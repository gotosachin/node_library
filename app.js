const express = require('express'),
    chalk = require('chalk'),
    debug = require('debug')('app'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');
//  mongoose = require('mongoose'),


const app = express();
const port = process.env.port || 3000;
// body parser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret:'libraryApp'}));

require('./src/config/passport.js')(app);


// Navigation links
const nav = [
    { link: '/books', title: 'Books' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' },
    { link: '/faq', title: 'Faq' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // to keep static files like css/js
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    //res.send('Welcome to library');
    //res.sendFile(path.join(__dirname, 'views/index.html'));
    res.render('index', {
        title: 'Library',
        nav: [
            { link: '/books', title: 'Books' },
            { link: '/about', title: 'About' },
            { link: '/contact', title: 'Contact' },
            { link: '/faq', title: 'Faq' }
        ]
    }); // using src/views index.ejs file
});


app.listen(port, function () {
    //console.log('library Running on port: ' + chalk.green(port));
    debug('Library Running on port: ' + chalk.green(port));
});

//module.exports = app;

// db connection
// const dbname = '';
//     if (process.env.ENV == 'Test'){
//         dbname = 'bookapi_test';
//     } else {
//         dbname ='bookapi';
//     }

// const db = mongoose.connect('mongodb://localhost/'+dbname).then(() => {
//         console.log("Connected to Database: " + dbname);
//     }).catch((err) => {
//         console.log("Not Connected to Database ERROR! ", err);
// });