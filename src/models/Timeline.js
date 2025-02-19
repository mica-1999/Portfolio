const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Number, required: true }
});

const timelineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    events: [timelineEventSchema]
});

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;