const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    id : { type: Number, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastActive: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true }
}, { collection: 'users' });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);