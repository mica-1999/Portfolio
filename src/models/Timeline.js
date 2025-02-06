const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    id: { type: Number, required: false, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: false },
    state: { type: Number, required: true },
    lastEvent: { type: Date, required: true},

    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false }
})

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;