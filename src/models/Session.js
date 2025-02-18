const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamps: { type: [Date], default: [] },
    createdAt: { type: Date, default: Date.now }
})

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;