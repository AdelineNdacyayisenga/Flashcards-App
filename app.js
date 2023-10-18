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


//root route
// app.get('/', (req, res) => {
//     res.send('<h1>I love God!</h1>');
// }); //get request to a certain URL

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name: name});//since it knows the the template file is .pug, you don't need to write index.pug
    } else {
        res.redirect('/hello');
    }
    
});

//another route
app.get('/cards', (req, res) => {
    
    res.render('card', {prompt:"Who is Jesus?"})
}); //get request to a certain URL

//playground route
app.get('/sandbox', (req, res) => {
    //the second parameters inside render() are called locals and they are optional
    //res.locals.prompt = "Who is Jesus' Father?" //flashcard question
    //res.render('card');
    //res.render('card', {prompt: "Who is Jesus' father?", hint: "Think about the creator of heaven and earth"});
    res.render('sandbox', {prompt: "This will be fun!", colors, hint:"You are awesome"});
});

//Hello route
app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
});
//makes sure the hello route posts the form input in the template
//Then we can do something with the data we get from the user
app.post('/hello', (req, res) => {
    //res.json(req.body);
    res.cookie('username', req.body.username);
    //res.render('hello', {name: req.body.username});

    //redirect people to welcome page after submitting form
    res.redirect('/')
});

//Goodbye
app.post('/goodbye', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.clearCookie('username');
        res.redirect('/hello');
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
}); //in the browser, then test by typing localhost:3000

