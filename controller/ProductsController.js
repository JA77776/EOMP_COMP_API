import express  from "express";
import bodyParser from "body-parser";
import { products } from "../models/index.js";


const productRouter= express();

//Fetch all products
productRouter.get("/", (req, res) => {
    try {
        products.fetchProducts(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve products",
        });
    }
});


// Fetch a specific product
productRouter.get('/:id/getProduct', (req, res) => {
    try {
        products.fetchProduct(req,res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve a product",
        });
    }
});


// Add a new product
productRouter.post('/addProduct',  bodyParser.json(), (req,res) => {
    try {
        products.addProduct(req,res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add product",
        });
    }
});


// Update a prduct (PATCH)
productRouter.patch('/:id/alterProduct', bodyParser.json(), (req, res) => {
    try {
        products.alterProduct(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to update product",
        });
    }
});


// Delete a product
productRouter.delete('/:id/deleteProduct', (req, res) => {
    try {
        products.deleteProduct(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete product",
        });
    }
});

export {
    productRouter
}

