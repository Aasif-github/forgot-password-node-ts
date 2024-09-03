"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResetPassword = exports.handleForgotPassword = void 0;
const authService_1 = require("../services/authService");
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await (0, authService_1.forgotPassword)(email);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
};
exports.handleForgotPassword = handleForgotPassword;
const handleResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await (0, authService_1.resetPassword)(token, newPassword);
        res.status(200).json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
};
exports.handleResetPassword = handleResetPassword;
//# sourceMappingURL=authController.js.map