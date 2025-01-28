const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE TIMELINE COLLECTION IN DB 
const timelineSchema = new mongoose.Schema({
    id: { type: Number, required: false, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: false },
    state: { type: Number, required: true },
    lastEvent: { type: Date, required: true},

    
    // Reference to the associated Project
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false }
})

// Check if the model already exists before defining it
const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;