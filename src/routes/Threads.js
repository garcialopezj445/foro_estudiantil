const { Router } = require('express');
const router = Router();

const mysqlConnection = require('../Database');

router.get('/viewThreads', async (req, res) =>{
    await mysqlConnection.query('SELECT * FROM HILO', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/viewThread/:id', async (req, res) => {
    const { 
        id 
    } = req.params;

    await mysqlConnection.query('SELECT * FROM HILO WHERE IDENTIFICACIONHILO = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/createThread', async (req, res) => {
    const {
        identificacionHilo,
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    } = req.body;

    const newThread = {
        identificacionHilo,
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    }

    await mysqlConnection.query('INSERT INTO HILO SET ?', [newThread], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'thread Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/updateThread/:id', async (req, res) => {
    const {
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    } = req.body;
 
    const hilo = {
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    }

    const {
        identificacionHilo
    } = req.params;

    await mysqlConnection.query('UPDATE HILO SET ? WHERE IDENTIFICACIONHILO = ?', [hilo, identificacionHilo], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'thread Updated'});
        } else { 
            console.log(err);
        }
    });
})

router.delete('/deleteThread/:id', async (req, res) => {
    const { 
        identificacionHilo 
    } = req.params;

    await mysqlConnection.query('DELETE FROM HILO WHERE IDENTIFICACIONHILO = ?', [identificacionHilo], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'thread Deleted'});
        } else { 
            console.log(err);
        }
    })
    
});

module.exports = router;