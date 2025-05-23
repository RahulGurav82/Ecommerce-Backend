const express = require('express'); 
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require("./routes/auth/auth-route")
const adminProductsRoutes = require("./routes/admin/products-routes");
const shopProductsRoutes = require("./routes/shop/products-routes")
mongoose
.connect('mongodb+srv://rahul:rahul@cluster0.l5ugu.mongodb.net/nn ')
// .connect('mongodb+srv://rahul:rahul@cluster0.l5ugu.mongodb.net/ ')
.then(() => console.log("DB Connected"))
.catch((err) => console.log("Error While DB Connect : ", err))

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth/", authRoute);
app.use("/api/admin/products", adminProductsRoutes)
app.use("/api/shop/products", shopProductsRoutes)

app.get("/", (req, res) => {
    res.send("Work")
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});