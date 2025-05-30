const express = require('express'); 
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require("./routes/auth/auth-route")
const adminProductsRoutes = require("./routes/admin/products-routes");
const adminOrderRoutes = require("./routes/admin/order-routes");
const shopProductsRoutes = require("./routes/shop/products-routes")
const shopCartRoutes = require("./routes/shop/cart-routes")
const shopAddressRoutes = require("./routes/shop/address-routes")
const shopOrdersRoutes = require("./routes/shop/order-routes")
const shopSearchRoutes = require("./routes/shop/search-routes")
const shopReviewRoutes = require("./routes/shop/review-routes")

const commonFeatureRoutes = require("./routes/common/feature-routes")
require("dotenv").config();



mongoose
.connect(process.env.MONGO_URI)
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
app.use("/api/admin/orders", adminOrderRoutes)

app.use("/api/shop/products", shopProductsRoutes)
app.use("/api/shop/cart", shopCartRoutes)
app.use("/api/shop/address", shopAddressRoutes)
app.use("/api/shop/order", shopOrdersRoutes)
app.use("/api/shop/search", shopSearchRoutes)
app.use("/api/shop/review", shopReviewRoutes)

app.use("/api/common/feature", commonFeatureRoutes)

app.get("/", (req, res) => {
    res.send("Work")
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});