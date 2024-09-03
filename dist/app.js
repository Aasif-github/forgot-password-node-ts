"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
// app.use((err: Error, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
exports.default = app;
//# sourceMappingURL=app.js.map