import express, {} from "express";
import authRouter from './src/routes/authRouter.js';
const app = express();
const PORT = 3000;
app.use(express.json());
const router = express.Router();
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
        code: err.status || 500,
        description: err.message || "An error occurred"
    });
});
app.listen(PORT);
//# sourceMappingURL=index.js.map