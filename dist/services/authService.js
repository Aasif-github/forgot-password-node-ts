"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const email_1 = require("../utils/email");
const userModel_1 = require("../models/userModel");
const forgotPassword = async (email) => {
    const user = await (0, userModel_1.getUserByEmail)(email);
    if (!user)
        throw new Error('User not found');
    const resetToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(exports.resetPassword);
    await (0, userModel_1.saveResetToken)(email, resetToken);
    const resetURL = `http://your-frontend-url.com/reset-password?token=${resetToken}`;
    await (0, email_1.sendPasswordResetEmail)(email, resetURL);
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (token, newPassword) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await (0, userModel_1.getUserByEmail)(decoded.email);
    if (!user || user.resetToken !== token)
        throw new Error('Invalid or expired token');
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    await (0, userModel_1.updateUserPassword)(user.email, hashedPassword);
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authService.js.map