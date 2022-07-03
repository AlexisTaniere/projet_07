// Ensemble des controllers pour les posts

const connection = require('../database');
const fs = require("fs");


// Permet de créer un nouveau post et de l'ajouter à la base de données
exports.createPost = (req, res, next) => {

    let urlImage = null;
    if (req.body.text === "") {
        req.body.text = null;
    }

    if (req.file) {
        urlImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename
            }`
    }

    if (req.file || req.body.text) {
        connection.query('INSERT INTO post (title, text, date, dateModify, userId, urlImage) VALUES (?, ?, DEFAULT, NULL, ?, ?)', [req.body.title, req.body.text, req.auth, urlImage], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Veuillez renseigner tous les champs" });
            }
            else {
                console.log(result)
                return res.status(201).json({ message: "Post créé" });
            }
        })
    }

}

// Permet de selectionner tous les posts de la base de données et de retourner leurs informations au front
exports.getAllPosts = (req, res, next) => {

    connection.query('SELECT p.title, p.id, p.userId, p.text, p.date, p.dateModify, p.nbLike, u.pseudo, p.urlImage FROM post p, utilisateur u WHERE p.userId = u.id ORDER BY date DESC LIMIT 50', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
        else {
            return res.status(200).json(result);
        }
    })
}

// Permet de selectionner les posts d'un utilisateur
exports.getUserPosts = (req, res, next) => {

    connection.query('SELECT p.title, p.text, p.date, p.dateModify, u.pseudo FROM post p, utilisateur u WHERE p.userId = u.id AND p.userId = ? ORDER BY date DESC LIMIT 50', [req.auth], (err, result) => {
        if (result[0] == undefined) {
            return res.status(401).json({ erreur: "Aucun post trouvé !" });
        }

        if (err) {
            return res.status(400).json({ err });
        }
        else {
            return res.status(200).json(result);
        }
    })

}

// Permet de supprimer un post si l'utilisateur est l'auteur de celui-ci ou si il est administrateur
exports.deletePost = (req, res, next) => {

    connection.query('SELECT * FROM post WHERE id = ?', [req.params.id], (err, result) => {

        if (result[0] == undefined) {
            return res.status(401).json({ erreur: "Post introuvable !" });
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
        else {
            if (result[0].userId == req.auth || req.admin === 1) {
                if (result[0].urlImage) {
                    const filename = result[0].urlImage.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        console.log("image supprimée");
                    })
                }
                if (result[0].nbLike != 0) {
                    connection.query('DELETE FROM postLike WHERE postId = ?', [req.params.id], (err, result) => {
                    })
                }
                connection.query('DELETE FROM post WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        return res.status(400).json({ err });
                    }
                    else {
                        return res.status(200).json({ message: "Post supprimé" });
                    }
                })

            }
            else {
                return res.status(401).json({ message: "Non autorisé" })
            }

        }
    })
}

// Permet de modifier un post si l'utilisateur est l'auteur de celui-ci ou si il est administrateur
exports.modifyPost = (req, res, next) => {

    connection.query('SELECT * FROM post WHERE id = ?', [req.params.id], (err, result) => {

        if (result[0] == undefined) {
            return res.status(401).json({ erreur: "Post introuvable !" });
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
        else {
            if (result[0].userId == req.auth || req.admin === 1) {
                let urlImage = result[0].urlImage;

                if (req.file) {
                    urlImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                }
                connection.query('UPDATE post SET title = ?, text = ?, dateModify = DEFAULT, urlImage = ? WHERE id = ?', [req.body.title, req.body.text, urlImage, req.params.id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ err });
                    }
                    else {
                        return res.status(200).json({ message: "Post modifié" });
                    }
                })

            }
            else {
                return res.status(401).json({ message: "Non autorisé" });
            }

        }
    })

}

// Permet à un utilisateur d'ajouter ou d'enlever un like à une post
exports.likePost = (req, res, next) => {
    connection.query('SELECT * FROM postLike WHERE userId = ? and postId = ?', [req.auth, req.params.id], (err, result) => {
        if (result[0]) {
            connection.query('DELETE FROM postLike WHERE userId = ? and postId = ?', [req.auth, req.params.id], (err, result) => {
                if (err) {
                    return res.status(400).json({ err })
                }
                else {
                    connection.query('UPDATE post SET nbLike = nbLike - 1 WHERE id = ?', [req.params.id], (err, result) => {
                    })
                    return res.status(200).json({ message: "Like enlevé" });
                }
            })
        }
        else {
            connection.query('INSERT INTO postLike (userId, postId) VALUES (?, ?)', [req.auth, req.params.id], (err, result) => {
                connection.query('UPDATE post SET nbLike = nbLike + 1 WHERE id = ?', [req.params.id], (err, result) => {
                })
                return res.status(200).json({ message: "L'utilisateur vient de liker ce post" })
            })
        }
    })
}