"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./router/products"));
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3000;
    let server;
    function useBodyParser() {
        app.use(express_1.default.json());
    }
    function useRouters() {
        app.use("/products", products_1.default);
    }
    function useCors() {
        app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
            methods: "*"
        }));
    }
    function start() {
        useBodyParser();
        useRouters();
        useCors();
        return new Promise((resolve, reject) => {
            server = app.listen(port, () => {
                console.log(`> [app] Server listening on http://localhost:${port}/`);
                return resolve(null);
            });
        });
    }
    function stop() {
        return new Promise((resolve, reject) => {
            server.close(() => {
                console.log("> [app] Server closed as successful!");
                return resolve(null);
            });
        });
    }
    return { start, stop };
}
exports.default = createApp;
