const Image = require('../models/Image');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config (Ensure env vars are set)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload an image
// @route   POST /api/images/upload
// @access  Private
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'alam-image-enhancer',
        });

        const imageUrl = result.secure_url;

        // Create initial record
        // We create it here so we have an ID to reference later, or just return the URL
        // The current frontend might just expect the URL to display it

        res.json({ url: imageUrl, public_id: result.public_id });
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

// @desc    Process an image (Enhance, Upscale, etc.)
// @route   POST /api/images/process
// @access  Private
const processImage = async (req, res) => {
    const { imageUrl, type } = req.body;

    try {
        // Check credentials
        if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
            // Fallback for missing credentials to avoid crashing
            console.warn('Missing Cloudinary credentials. Returning original image.');
            const imageRecord = await Image.create({
                user: req.user.id,
                originalUrl: imageUrl,
                type: type,
                status: 'completed',
                enhancedUrl: imageUrl
            });
            return res.json({
                originalUrl: imageUrl,
                enhancedUrl: imageUrl,
                recordId: imageRecord._id,
                message: 'Enhancement skipped: Missing Cloudinary keys.'
            });
        }

        // Generate enhanced URL using Cloudinary transformations
        // We assume imageUrl is a Cloudinary URL or we re-upload. 
        // If it's a Cloudinary URL, we can just manipulate it.
        // But for simplicity/robustness, let's re-upload with effect if it's not a public_id.
        // Actually, the easiest way is to use the upload API to applying the transformation regardless of source.

        // Select transformation based on type
        let transformation = { effect: 'improve:outdoor' }; // Default

        switch (type) {
            case 'remove-bg':
                // Requires 'Cloudinary AI Background Removal' Add-on
                transformation = { effect: 'background_removal' };
                break;
            case 'upscale':
                // Using Generative Upscale (if available) or standard upscale
                // width: 2.0, crop: 'scale' is basic resizing.
                // effect: 'upscale' is a specific feature.
                transformation = { effect: 'upscale' };
                break;
            case 'restore':
                // Requires 'Generative Restore' Add-on
                transformation = { effect: 'gen_restore' };
                break;
            case 'enhance':
            default:
                transformation = { effect: 'improve:outdoor' };
                break;
        }

        const result = await cloudinary.uploader.upload(imageUrl, {
            ...transformation,
            folder: 'alam-image-enhancer/enhanced'
        });

        const enhancedUrl = result.secure_url;

        // CREATE RECORD
        const imageRecord = await Image.create({
            user: req.user.id,
            originalUrl: imageUrl,
            type: type,
            status: 'completed',
            enhancedUrl: enhancedUrl
        });

        res.json({
            originalUrl: imageUrl,
            enhancedUrl: enhancedUrl,
            recordId: imageRecord._id
        });

    } catch (error) {
        console.error('Processing Error:', error);
        res.status(500).json({ message: 'Processing failed', error: error.message });
    }
};

// @desc    Get user's image history
// @route   GET /api/images/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const history = await Image.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadImage,
    processImage,
    getHistory
};
