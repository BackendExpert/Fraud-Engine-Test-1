const mongoose = require('mongoose');

const LoginActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ip: String,
    device: String,

    location: {
        country: String,
        city: String,
        lat: Number,
        lng: Number
    },

    success: Boolean,
    riskScore: Number,

    createdAt: { type: Date, default: Date.now }
});

const LoginActivity = mongoose.model('LoginActivity', LoginActivitySchema);

module.exports = LoginActivity;