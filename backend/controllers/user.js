const bcrypt = require('bcrypt');

const connection = require('../database');

exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            connection.query('INSERT INTO utilisateur (pseudo, password, email) VALUES (?, ?, ?)', [req.body.pseudo, hash, req.body.email], (err, result) => {
                if (err) {
                    let message = "Erreur lors de l'inscription";
                    if (err.errno === 1062) {
                        if (err.sqlMessage.includes("pseudo")) {
                            message = "Ce pseudo existe déjà";
                        }
                        else {
                            message = "Cet email existe déjà";
                        }
                    }
                    console.log(err);
                    return res.status(400).json({ error: message });
                }
                return res.status(201).json({ message: "User created" });
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "bcrypt malfunctionned" })
        });



};