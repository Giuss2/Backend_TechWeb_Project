import express from "express"
import authRouter from './src/routes/authRouter';

const app= express();
const PORT= 3000;


app.use(express.json());
const router = express.Router();
app.use('/auth', authRouter);

app.get('/', (req, res)=>{
  res.send('Hello World!')
});

//middleware for login

//error handler
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});


app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error sync:", err);
  }
});


