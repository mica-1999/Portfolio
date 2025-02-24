const mongoose = require('mongoose');

const learningInfoSchema = new mongoose.Schema({
    icon: { type: String, required: true }, // URL or path to icon image
    titleCard: { type: String, required: true, minlength: 3, maxlength: 100 }, // Main title
    subtitleCard: { type: String, required: true, minlength: 10, maxlength: 200 }, // Short description
    category: { type: String, required: true }, // General category (e.g., Programming)
    subcategory: { type: String, required: true }, // More specific category (e.g., JavaScript)
    tags: { type: [String], required: true }, // Keywords for filtering/searching
    description: { type: String, required: true  }, // Brief explanation of topic
    state: { type: String, required: true, enum: ['Learned', 'Mastered', 'In Progress', 'Trying', 'Completed', 'On Hold', 'Abandoned'] }, // Current status
    dateCreated: { type: Date, default: Date.now }, // Auto-fills creation date
    lastUpdated: { type: Date, default: Date.now }, // Auto-fills update date
    codeSnippet: {
        language: { type: String, required: true }, // e.g., 'JavaScript'
        code: { type: String, required: true }, // Actual code
        explanation: { type: String } // Optional explanation of code
    },
    codeSnippet: {
        type: new mongoose.Schema({
          language: { type: String, required: true }, // e.g., 'JavaScript'
          code: { type: String, required: true }, // Actual code
          explanation: { type: String } // Optional explanation of code
        }, { _id: false }) // Prevents an extra `_id` field
      },    
    userNotes: { type: String },
    views: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false }
});

// Create the model
const learningSoftware = mongoose.models.learningSoftware || mongoose.model('learningSoftware', learningInfoSchema, 'learningSoftware');

module.exports = learningSoftware;

