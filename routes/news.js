const express = require('express');
const router = express.Router();
const dbConnection = require('../config/dbConnection')
const connection = dbConnection()

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM news", (error, result) => {
        console.log(error)
        res.render('news/news.ejs', {
        news: result
        })
    })
});

module.exports = router;

/* POST home page. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    const {title, news} = req.body 
    connection.query('INSERT INTO news SET ?', {
        title,
        news
    }, (error, result) => {
        res.redirect('/news')
    })
});

module.exports = router;
