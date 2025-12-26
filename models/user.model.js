const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    usualLoginHours: {
        start: { type: Number, default: 6 },
        end: { type: Number, default: 22 }
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;