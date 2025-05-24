const ProductModel = require("../../models/Product.model");


const getFillteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};

        if(category.length) {
            filters.category = {$in: category.split(',')}
        }

        if(brand.length) {
            filters.brand = {$in: brand.split(',')}
        }

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.salePrice = 1
                break;
            case "price-hightolow":
                sort.salePrice = -1
                break;
            case "title-atoz":
                sort.title = -1
                break;
            case "title-ztoa":
                sort.title = 1
                break;
        
            default:
                sort.price = 1
                break;
        }

        const products = await ProductModel.find(filters).sort(sort);

        res.status(200).json({
            success : true,
            data : products
        });
        
    } catch (error) {
        res.status(500).json({
           success : false,
           message : "Error While Fetch Product" 
        });
    }
}

const getProductDetails = async (req, res) => {
    try {

        const {id} = req.params;
        const product = await ProductModel.findById(id);

        if (!product) return res.status(404).json({
            success : false,
            message : "product not found"
        })

        res.status(200).json({
            success : true,
            data : product
        })
        
    } catch (error) {
        res.status(500).json({
           success : false,
           message : "Error While Fetch Product Details" 
        });
    }
}

module.exports = { getFillteredProducts, getProductDetails }