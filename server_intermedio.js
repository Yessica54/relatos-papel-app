const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/books", async (req, res) => {
    try {
        const response = await axios.get("http://ec2-3-135-221-63.us-east-2.compute.amazonaws.com:8080/ms-books-catalogue/books");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

app.listen(3001, () => console.log("Proxy corriendo en http://localhost:3001"));