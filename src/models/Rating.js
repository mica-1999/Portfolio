const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema, 'ratings');

module.exports = Rating;