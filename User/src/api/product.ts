import { Channel } from "amqplib";
import { Application, NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product-service";


export default (app:Application, channel:Channel) =>{
    const service = new ProductService()
    app.post("/product", async(req:Request, res:Response, next:NextFunction) =>{
        try {
            const product  = await service.createProduct(req.body)
            return res.status(201).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get(".product/:id", async(req:Request, res:Response, next:NextFunction) =>{
        try {
            const {id} =  req.params
            const product = await service.getProduct(id)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get("/product", async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const product  = await service.getProducts()
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get("/product/category/:id", async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const {id} = req.params
            const product = await service.getProductCategory(id)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get("/product/module/:id", async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const {id} = req.params
            const product = await service.getProductModule(id)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })

}