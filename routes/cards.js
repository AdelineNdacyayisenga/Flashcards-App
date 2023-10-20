const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data; //equivalent to cards = cards.data

//random url
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const randomflashcardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${randomflashcardId}?side=question`);
});

//another route
//parameter routes allow us to specify which card we want from the url
//localhost:3000/cards/1 displays card on index 1
router.get('/:id', (req, res) => { // or '/cards'
    //query string
    const {side} = req.query; //req.query.side
    const { id } = req.params;

    if( !side ) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    const templateData = { id, text, name };

    if(side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if(side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
    // res.render('card', {
    //     prompt: cards[req.params.id].question,
    //     hint: cards[req.params.id].hint
    // });
}); //get request to a certain URL

module.exports = router;