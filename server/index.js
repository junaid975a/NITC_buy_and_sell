const express = require('express');
const app = express();
const db = require("./models");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
require('dotenv').config(); // Add this line at the top of your code

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth",authRoutes)
app.use("/product",productRoutes)

db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("connected to server")
    });
})
