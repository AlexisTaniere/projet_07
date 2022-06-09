const connection = require('../database');

exports.createPost = (req, res, next) => {
    console.log(req.auth);

    if (req.body.text === "") {
        req.body.text = null;
    }

    connection.query('INSERT INTO post (title, text, date, dateModify, userId) VALUES (?, ?, DEFAULT, NULL, ?)', [req.body.title, req.body.text, req.auth], (err, result) => {
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

exports.getAllPosts = (req, res, next) => {

    connection.query('SELECT p.title, p.id, p.text, p.date, p.dateModify, u.pseudo FROM post p, utilisateur u WHERE p.userId = u.id ORDER BY date DESC LIMIT 50', (err, result) => {
        if (result[0] == undefined) {
            return res.status(401).json({ erreur: "Aucun post trouvé !" });
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
        else {
            return res.status(200).json(result);
        }
    })
}

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
            if (result[0].userId == req.auth) {
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
            if (result[0].userId == req.auth) {
                connection.query('UPDATE post SET title = ?, text = ?, dateModify = DEFAULT WHERE id = ?', [req.body.title, req.body.text, req.params.id], (err, result) => {
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