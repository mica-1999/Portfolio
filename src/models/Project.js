const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: { type: String, required: false},
    image: { type: String, required: false},
    tags: { type: Array, required: true},
    state: { type: Number, required: true }, 
    lastUpdated: { type: Date, required: true},
    created: { type: Date, required: true},
    version: { type: String, required: true}
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;