const express = require("express"); 
const dotenv = require("dotenv"); 
const connectDB=require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const PORT = process.env.PORT || 3000;
const error = require("./middleware/errorHandler");
const app = express();
const authRoutes=require("./routes/auth");


dotenv.config();
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next()
});

app.use("/auth", authRoutes)
app.use("/movies", movieRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})

app.use(error);
connectDB();

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

