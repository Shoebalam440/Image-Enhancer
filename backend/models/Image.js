const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    enhancedUrl: {
        type: String,
    },
    type: {
        type: String, // enhance, upscale, remove-bg, etc.
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Image', ImageSchema);
