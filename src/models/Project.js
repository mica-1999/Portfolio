const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE PROJECTS COLLECTION IN DB 
const projectSchema = new mongoose.Schema({
    id : { type: Number, required: true},
    title: { type: String, required: true},
    description: { type: String, required: false},
    link: { type: String, required: false},
    image: { type: String, required: false},
    tags: { type: Array, required: true},
    state: { type: Number, required: true }, // Changed from String to Number,
    lastUpdated: { type: Date, required: true},
    created: { type: Date, required: true},
    version: { type: String, required: true}
});

// Check if the model already exists before defining it
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;