const mongoose = require('mongoose');

// Define nested schemas first
const conceptSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2 },
    explanation: { type: String, required: true, minlength: 10 }
}, { _id: false });

const codeSnippetSchema = new mongoose.Schema({
    language: { type: String, required: true, minlength: 2 },
    code: { type: String, required: true, minlength: 5 },
    explanation: { type: String, required: true, minlength: 10 }
}, { _id: false });

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2 },
    url: { type: String, required: true },
    description: { type: String, required: true, minlength: 10 }
}, { _id: false });

// Main schema
const learningInfoSchema = new mongoose.Schema({
    icon: { 
        type: String, 
        get: function() {
            // Generate icon path based on subcategory
            if (this.subtitleCard) {
                const iconSubcategory = this.subtitleCard.toLowerCase().replace(/\s+/g, '');
                return `/assets/images/subCategoriesImages/${iconSubcategory}.png`;
            }
            return '/assets/images/subCategoriesImages/default.png';
        }
    },
    titleCard: { type: String, required: true, minlength: 2, maxlength: 100 },
    subtitleCard: { type: String, required: true, minlength: 2, maxlength: 200 },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    tags: { 
        type: [String], 
        required: true,
        set: function(tags) {
            // Handle comma-separated string from form
            if (typeof tags === 'string') {
                return tags.split(',').map(tag => tag.trim());
            }
            return tags;
        }
    },
    description: { type: String, required: true, minlength: 10 },
    state: { 
        type: String, 
        required: true, 
        enum: ['Learned', 'Mastered', 'In Progress', 'Trying', 'Completed', 'On Hold', 'Abandoned'] 
    },
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    
    // Collections from the form
    concepts: [conceptSchema],
    codeSnippets: [codeSnippetSchema],
    videos: [videoSchema],
    
    userNotes: { type: String, maxlength: 300 },
    views: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false },
});

// Configure schema to use getters when converting to JSON/Object
learningInfoSchema.set('toJSON', { getters: true });
learningInfoSchema.set('toObject', { getters: true });

// Update timestamps on save
learningInfoSchema.pre('save', function(next) {
    this.lastUpdated = Date.now();
    next();
});

// Create the model
const LearningSoftware = mongoose.models.learningSoftware || 
    mongoose.model('learningSoftware', learningInfoSchema, 'learningsoftwares');

module.exports = LearningSoftware;