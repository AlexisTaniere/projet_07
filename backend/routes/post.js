// Routes pour les posts

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config")

router.post('/', auth, multer, postCtrl.createPost);
router.post('/like/:id', auth, postCtrl.likePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/user', auth, postCtrl.getUserPosts);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);

module.exports = router;