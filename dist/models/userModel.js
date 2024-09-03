"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.saveResetToken = exports.getUserByEmail = void 0;
const users = {
    'user@example.com': { email: 'user@example.com', password: 'hashed_password' },
};
const getUserByEmail = async (email) => {
    return users[email] || null;
};
exports.getUserByEmail = getUserByEmail;
const saveResetToken = async (email, resetToken) => {
    if (users[email]) {
        users[email].resetToken = resetToken;
    }
};
exports.saveResetToken = saveResetToken;
const updateUserPassword = async (email, password) => {
    if (users[email]) {
        users[email].password = password;
        delete users[email].resetToken;
    }
};
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=userModel.js.map