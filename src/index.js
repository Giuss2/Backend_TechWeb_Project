import express from "express"

const app= express();
const PORT= 3000;


//middleware for login

//error handler
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});



app.listen(PORT);