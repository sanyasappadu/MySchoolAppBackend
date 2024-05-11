const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.post('/blog', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.put('/blog/:id', blogController.updateBlog);
router.get('/blog/:id', blogController.getBlog);
router.delete('/blog/:id', blogController.deleteBlog);

module.exports = router;
