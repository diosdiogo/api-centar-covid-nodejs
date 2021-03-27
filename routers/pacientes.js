const express = require('express');
const router = express.Router();
var cors = require('cors');
const mysql = require('../mysql').pool;

//retorna todos
router.get('/', cors(), (req, res, next) => {
   
    mysql.getConnection((error, conn) => {

        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM paciente',
            (error, resultado, field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                         error: error,
                         response: null
                     });
                 }

                 res.status(201).send({
                    resultado,
                });

            }
        )
    });

});


//insere
router.post('/',  cors(), (req, res, next) => {

    mysql.getConnection((error, conn) => {
        console.log(req.body.nome)
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO paciente (nome, idade, teste) VALUES (?,?,?)',
            [req.body.nome, req.body.idade, req.body.teste],
            (error, resultado, field) => {
                conn.release();

                if(error){
                   return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem : 'SUCCESS',
                    id: resultado.insertId,
                })
            }
        )
    })
});

//retorna um 
router.get('/:id_paciente',  cors(), (req, res, next) => {
    
    if(req.params.id_paciente == 0){
        res.status(200).send({
            error: 'ID invalido',
        });
    }else{
        mysql.getConnection((error, conn) => {

            if(error){return res.status(500).send({error: error})}

            conn.query(
                'SELECT * FROM paciente where id = ?',
                [req.params.id_paciente],
                (error, resultado, field) => {
                    conn.release();
                    
                    if(error){
                        return res.status(500).send({
                             error: error,
                             response: null
                         });
                     }

                    res.status(201).send({
                        resultado
                    })
                }

            )
        })
    }
    
});
router.patch('/',  cors(), (req, res, next) => {
    if(req.params.id_paciente == 0){
        res.status(200).send({
            error: 'ID invalido',
        });
    }else{
        mysql.getConnection((error, conn) => {

            if(error){return res.status(500).send({error: error})}

            conn.query(
                'UPDATE paciente SET nome = ?, idade = ?, teste = ? WHERE id = ?',
                [req.body.nome, req.body.idade, req.body.teste, req.body.id],
                (error, resultado, field) => {
                    conn.release();
                    
                    if(error){
                        return res.status(500).send({
                             error: error,
                             response: null
                         });
                     }

                    res.status(201).send({
                        resultado
                    })
                }
            )
        })
    }
});

router.delete('/:id_paciente',  cors(), (req, res, next) => {

    if(req.params.id_paciente == 0){
        res.status(200).send({
            error: 'ID invalido',
        });
    }else{
        mysql.getConnection((error, conn) => {
            if(error){return res.status(500).send({error: error})}
            conn.query(
                'DELETE FROM paciente WHERE id = ?',
                [req.params.id_paciente],
                (error, resultado, field) => {
                    conn.release();

                    if(error){
                        return res.status(500).send({
                            error: error,
                            response: 222
                        });
                    }
                    res.status(201).send({
                        resultado
                    })
                    
                }
            )
        })
    }
    
});

module.exports = router;