const { Router } = require('express');
const router = Router();

const mysqlConnection = require('../Database');

router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM USUARIO', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM USUARIO WHERE IDENTIFICACIONUSUARIO = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/createUser', (req, res) => {

});

module.exports = router;