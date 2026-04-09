const cloudinary = require('cloudinary').v2;
const { supabase } = require('../middleware/supabaseAuth');

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload an image to Cloudinary
// @route   POST /api/images/upload
// @access  Private
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'alam-image-enhancer',
        });

        res.json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

// @desc    Process an image (Enhance, Upscale, etc.) — USES FREE CLOUDINARY ONLY
// @route   POST /api/images/process
// @access  Private
const processImage = async (req, res) => {
    const { imageUrl, type } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'imageUrl is required' });
    }

    try {
        // Check credentials
        if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
            return res.json({
                originalUrl: imageUrl,
                enhancedUrl: imageUrl,
                message: 'Enhancement skipped: Missing Cloudinary keys.'
            });
        }

        // Build transformation based on type — ALL FREE TIER COMPATIBLE
        // Made aggressive so results are CLEARLY visible
        let transformation = [];

        switch (type) {
            case 'remove-bg':
                // Requires free Cloudinary AI Background Removal add-on activation
                transformation = [{ effect: 'background_removal' }];
                break;
            case 'upscale':
                // flags:'relative' makes width:2.0 mean "2x original" instead of "2 pixels"
                transformation = [
                    { width: 2.0, height: 2.0, crop: 'scale', flags: 'relative' },
                    { effect: 'sharpen:80' },
                    { quality: 'auto:best' }
                ];
                break;
            case 'restore':
                // Aggressive restoration for old/damaged photos
                transformation = [
                    { effect: 'improve:100' },
                    { effect: 'auto_contrast' },
                    { effect: 'auto_color' },
                    { effect: 'auto_brightness' },
                    { effect: 'sharpen:100' },
                    { quality: 'auto:best' }
                ];
                break;
            case 'enhance':
            default:
                // Aggressive enhance — clearly visible improvement
                transformation = [
                    { effect: 'improve:100' },
                    { effect: 'auto_contrast' },
                    { effect: 'auto_brightness' },
                    { effect: 'sharpen:100' },
                    { effect: 'vibrance:40' },
                    { quality: 'auto:best' }
                ];
                break;
        }

        // Generate enhanced URL using Cloudinary SDK
        let enhancedUrl;

        if (imageUrl.includes('cloudinary.com')) {
            // Extract public_id from Cloudinary URL
            // URL format: https://res.cloudinary.com/CLOUD/image/upload/v123/folder/filename.ext
            const uploadIndex = imageUrl.indexOf('/upload/');
            if (uploadIndex !== -1) {
                const afterUpload = imageUrl.substring(uploadIndex + 8); // after '/upload/'
                // Remove version prefix (v1234567890/) if present
                const withoutVersion = afterUpload.replace(/^v\d+\//, '');
                // Remove file extension to get public_id
                const publicId = withoutVersion.replace(/\.\w+$/, '');

                // Use Cloudinary SDK to build the correct URL
                enhancedUrl = cloudinary.url(publicId, {
                    transformation: transformation,
                    secure: true
                });
            } else {
                // Fallback: re-upload with transformation
                const result = await cloudinary.uploader.upload(imageUrl, {
                    folder: 'alam-image-enhancer/enhanced',
                    transformation: transformation
                });
                enhancedUrl = result.secure_url;
            }
        } else {
            // Non-Cloudinary URL: upload with transformation
            const result = await cloudinary.uploader.upload(imageUrl, {
                folder: 'alam-image-enhancer/enhanced',
                transformation: transformation
            });
            enhancedUrl = result.secure_url;
        }

        // Save to Supabase history (non-blocking — don't fail if DB is down)
        try {
            await supabase.from('image_history').insert({
                user_id: req.user.id,
                original_url: imageUrl,
                enhanced_url: enhancedUrl,
                type: type,
                status: 'completed'
            });
        } catch (dbErr) {
            console.warn('Failed to save history:', dbErr.message);
        }

        res.json({
            originalUrl: imageUrl,
            enhancedUrl: enhancedUrl
        });

    } catch (error) {
        console.error('Processing Error:', error);
        res.status(500).json({ message: 'Processing failed', error: error.message });
    }
};

// @desc    Get user's image history from Supabase
// @route   GET /api/images/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('image_history')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
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
