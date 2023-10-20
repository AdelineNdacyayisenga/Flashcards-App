const express = require('express');
const router = express.Router();

//root route
// router.get('/', (req, res) => {
//     res.send('<h1>I love God!</h1>');
// }); //get request to a certain URL

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name: name});//since it knows the the template file is .pug, you don't need to write index.pug
    } else {
        res.redirect('/hello');
    }
    
});

//playground route
router.get('/sandbox', (req, res) => {
    //the second parameters inside render() are called locals and they are optional
    //res.locals.prompt = "Who is Jesus' Father?" //flashcard question
    //res.render('card');
    //res.render('card', {prompt: "Who is Jesus' father?", hint: "Think about the creator of heaven and earth"});
    res.render('sandbox', {prompt: "This will be fun!", colors, hint:"You are awesome"});
});

//Hello route
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
});
//makes sure the hello route posts the form input in the template
//Then we can do something with the data we get from the user
router.post('/hello', (req, res) => {
    //res.json(req.body);
    res.cookie('username', req.body.username);
    //res.render('hello', {name: req.body.username});

    //redirect people to welcome page after submitting form
    res.redirect('/')
});

//Goodbye
router.post('/goodbye', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.clearCookie('username');
        res.redirect('/hello');
    }
});

//export this router (mini express app) so that you can reference it in
// the app.js file

module.exports = router;