const express = require('express');
const router = express.Router();
const dbConnection = require('../config/dbConnection')
const connection = dbConnection()

/* GET home page. */
router.get('/:pagina', function(req, res, next) {
    let pagina = req.params.pagina;
    console.log(pagina);
    // let maxNew = 5;
    let minNew = (pagina-1)*5;
    connection.query("SELECT * FROM news LIMIT "+ minNew +",5", (error, result) => {
        connection.query('SELECT COUNT (*) as numero FROM news',(error2, result2) => {
            console.log(error)
            res.render('news/news.ejs', {
            news: result,
            numero_noticias: result2
            })
        } )
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
        res.redirect('/news/1')
    })
});

module.exports = router;
