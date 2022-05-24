const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require("../middleware/auth");

router.post('/', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/user', auth, postCtrl.getUserPosts);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.modifyPost);

module.exports = router;