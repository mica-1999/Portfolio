const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    message: {type: String, required: true},
    chatroomId: {type: String, required: true},
    timestampMsg: {type: Date, required: true},
    file: {type: String, required: false},
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const Chatroom = mongoose.models.Chatroom || mongoose.model('chatroom', chatroomSchema);
module.exports = Chatroom;