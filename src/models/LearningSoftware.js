const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    chatroomId: {  type: mongoose.Schema.Types.ObjectId, required: true, unique: true },  // Unique identifier for the chatroom
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],  // Array of User IDs (members)
    chatroomName: { type: String, required: false },  // Name of the chatroom (can be null or default for 1-on-1)
    isGroupChat: { type: Boolean, default: false },  // Boolean flag for group chats
    isPrivate: { type: Boolean, default: false },  // Flag for private (true) or public (false) chatroom
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // The user who created the chatroom
    createdAt: { type: Date, default: Date.now },  // Timestamp for chatroom creation
});

const Chatroom = mongoose.models.Chatroom || mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;
