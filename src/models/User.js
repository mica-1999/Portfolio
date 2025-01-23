const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE USERS COLLECTION IN DB

const userSchema = new mongoose.Schema(
  {
    // Unique Identifier for the User
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Securely Stored Password (hashed)
    password: { type: String, required: true, minlength: 8 },

    // Personal Information
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: false },

    // Role-Based Authorization
    role: {
      type: String,
      enum: ['admin', 'editor', 'viewer', 'author'],
      default: 'viewer',
    },

    // Account Status
    isActive: { type: Boolean, default: true },

    // Address and Location
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },

    // Account Timestamps
    lastLogin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // Reference to Other Collections
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Check if the Model Already Exists Before Defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
