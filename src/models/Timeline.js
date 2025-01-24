const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE TIMELINE COLLECTION IN DB 
const timelineSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String },
    state: { type: Number, required: true },
    lastEvent: { type: Date, required: true},

    
    // Reference to the associated Project
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
})

// Check if the model already exists before defining it
const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;