import express from "express";

const app = express();

app.get("/", (req, res, next) => {
    return res.send("hello there!");
});

app.listen(4000, () => {
    console.log("Server started!");
});

