"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['rider', 'driver', 'admin'],
        default: 'rider',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    driverProfile: {
        isApproved: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        vehicleInfo: {
            model: { type: String },
            licensePlate: { type: String },
            color: { type: String },
        },
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(config_1.default.bcrypt_salt_rounds || 10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
