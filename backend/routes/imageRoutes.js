const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
    uploadImage,
    processImage,
    getHistory
} = require('../controllers/imageController');

router.post('/upload', protect, upload.single('image'), uploadImage);
router.post('/process', protect, processImage);
router.get('/history', protect, getHistory);

module.exports = router;
