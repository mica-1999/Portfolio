const mongoose = require('mongoose');
// DEFINING THE SCHEMA FOR THE USERS COLLECTION IN DB
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: false },
    role: {
      type: String,
      enum: ['admin', 'editor', 'viewer', 'author'],
      default: 'viewer',
    },
    isActive: { 
      type: String,
      enum: ['active', 'inactive', 'pending', 'suspended'],
      default: 'pending',
    },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },
    lastLogin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    job: { type: String, required: false },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
