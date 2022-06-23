const { Router } = require('express');
const router = Router();

const mysqlConnection = require('../Database');

router.get('/viewUsers', async (req, res) =>{
    await mysqlConnection.query('SELECT * FROM USUARIO', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/viewUser/:id', async (req, res) => {
    const { 
        id 
    } = req.params;

    await mysqlConnection.query('SELECT * FROM USUARIO WHERE IDENTIFICACIONUSUARIO = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/createUser', async (req, res) => {
    const {
        identificacionUsuario,
        contraseña,
        nombreUsuario,
        rolUniversidad
    } = req.body;

    const newUser = {
        identificacionUsuario,
        contraseña,
        nombreUsuario,
        rolUniversidad
    }

    await mysqlConnection.query('INSERT INTO USUARIO SET ?', [newUser], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'User Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/updateUser/:id', async (req, res) => {
    const {
        contraseña,
        nombreUsuario,
        rolUniversidad
    } = req.body;
 
    const usuario = {
        contraseña,
        nombreUsuario,
        rolUniversidad
    }

    const {
        identificacionUsuario 
    } = req.params;

    await mysqlConnection.query('UPDATE USUARIO SET ? WHERE IDENTIFICACIONUSUARIO = ?', [usuario, identificacionUsuario], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'User Updated'});
        } else { 
            console.log(err);
        }
    });
})

module.exports = router;