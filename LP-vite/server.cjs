const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from 'dist' directory
app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
