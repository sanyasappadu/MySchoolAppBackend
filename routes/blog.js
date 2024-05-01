const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.post('/blog', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.put('/blog/:idnumber/:heading', blogController.updateBlog);
router.get('/blog/:idnumber/:heading', blogController.getBlog);
router.delete('/blog/:idnumber/:heading', blogController.deleteBlog);

module.exports = router;
