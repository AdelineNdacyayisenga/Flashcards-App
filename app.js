const express = require('express');//express is the module, so we require it to be able to use it
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//in terminal, call nodemon to run your local host 

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
//create the app
const app = express(); //returns express app
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//set upg
app.set('view engine', 'pug'); //pug is the template engine

const mainRoutes = require('./routes/index.js') //or '/.routes' cz index is by default
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
//Middleware

// app.use((req, res, next) => {
//     //req.message = 'Hello'
//     console.log('Hello');
//     const err = new Error('On noes!')
//     err.status = 500;
//     next(err);
// })

// }, (req, res, next) => {
//     console.log('One and a half');
//     next();
// });

app.use((req, res, next) => {
    //console.log(req.message);
    console.log('World');
    next();
});

//Page not found
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
}); //in the browser, then test by typing localhost:3000

