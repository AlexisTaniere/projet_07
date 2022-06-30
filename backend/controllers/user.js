// Ensemble des controllers pour les utilisateurs

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const connection = require('../database');


// Permet à un utilisateur de créer un compte
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
                return res.status(201).json({ message: "Utilisateur créé" });
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "bcrypt malfunctionned" })
        });
};


// Permet à un utilisateur de se connecter avec son email et son mot de passe
exports.login = (req, res, next) => {

    connection.query('SELECT * FROM utilisateur WHERE email = ?', [req.body.email], (err, result) => {


        if (err || result[0] == undefined) {
            return res.status(401).json({ erreur: "Utilisateur introuvable !" });
        }

        else {
            bcrypt.compare(req.body.password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ erreur: "Mot de passe incorrect" });
                    }
                    res.status(200).json({
                        userId: result[0].id,
                        admin: result[0].admin,
                        token: jwt.sign(
                            {
                                userId: result[0].id,
                                admin: result[0].admin
                            },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));

        }
    });
};


// Permet de supprimer le compte d'un utilisateur
exports.deleteUser = (req, res, next) => {

    if (req.auth) {
        connection.query('DELETE FROM utilisateur WHERE id = ?', [req.auth], (err, result) => {
            if (err) {
                return res.status(400).json({ err })
            }
            else {
                return res.status(200).json({ message: "Utilisateur supprimé" });
            }
        })
    }
    else {
        return res.status(403).json({ error: "Requête non autorisée" })
    }
};


// Permet de récupérer les informations du profil d'un utilisateur
exports.getProfil = (req, res, next) => {

    connection.query('SELECT pseudo, email, id, admin FROM utilisateur WHERE id = ?', [req.auth], (err, result) => {
        if (err) {
            return res.status(400).json({ err })
        }
        if (result[0] == undefined) {
            return res.status(401).json({ erreur: "Utilisateur introuvable !" });
        }
        else {
            return res.status(200).json({
                pseudo: result[0].pseudo,
                email: result[0].email,
                id: result[0].id,
                admin: result[0].admin
            })
        }

    })
};