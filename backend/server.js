require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("🚀 DevBlog API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});