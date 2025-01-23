const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE PROJECTS COLLECTION IN DB 

const projectSchema = new mongoose.Schema({
    id : { type: Number, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: { type: String, required: true},
    image: { type: String, required: false},
    tags: { type: Array, required: false},
    state: { type: Number, required: true }, // Changed from String to Number,
    lastUpdated: { type: Date, required: false},
    created: { type: Date, required: true},
    version: { type: String, required: true}
});

// Check if the model already exists before defining it
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;