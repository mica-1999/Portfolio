const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now },  
    files: [{ type: String }],  
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the sender user
    chatroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom', required: true },  // Reference to the chatroom this message belongs to
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;