import { connection as db } from '../config/index.js'

class Products{
    fetchProducts(req, res){
        const qry = `
        SELECT prodID, prodName, prodQuantity, prodAmount, prodURL ,userID
        FROM Products;
        `
        db.query(qry, (err, results)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results,
            })
        })
    }
    fetchProduct(req, res){
        const qry = `
        SELECT prodID, prodName, prodQuantity, prodAmount, prodURL, userID
        FROM Products
        WHERE prodID = ${req.params.id};
        `
        db.query(qry, (err, result)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result,
            })
        })
    }
    addProduct(req,res){
        const qry = `
        INSERT INTO Products
        SET ?;
        `
        db.query(qry,[req.body] ,(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "New product was added"
            })
        })
    }
    async deleteProduct(req,res){
        let data = req.body
        const qry= `
        DELETE FROM Products
        WHERE prodID = ${req.params.id};
        `
        db.query(qry,[data], (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: 'Product was successfully deleted'
            })
        })
    }
    async alterProduct(req,res){
        let data = req.body
        const qry = `
        UPDATE Products
        SET ?
        WHERE prodID = ${req.params.id};
        `
        db.query(qry, [data], (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "Product was successfully updated"
            })
        })
    }
}
export {
    Products
}