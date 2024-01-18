import { Channel } from "amqplib";
import { Application, NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { AuthMiddleware } from "./middleware/auth";


export default (app:Application, channel:Channel) =>{
    const service = new ProductService()
    app.post("/product", AuthMiddleware.Authenticate(["admin","vendor"]),  async(req:Request| any, res:Response, next:NextFunction) =>{
        try {
            const product  = await service.createProduct(req.body, req.user)
            return res.status(201).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get("/product/owner", AuthMiddleware.Authenticate(["vendor"]), async (req:Request|any, res:Response, next:NextFunction) =>{
        try {
            const product = await service.MyProduct(req.user)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.get("/product/:id", async(req:Request, res:Response, next:NextFunction) =>{
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
    app.patch("/product/:id",  AuthMiddleware.Authenticate(["admin","vendor"]), async(req:Request, res:Response, next:NextFunction) =>{
        try {
            const {id} = req.params
            const product = await service.updateProduct(id, req.body)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
    app.delete("/product/:id",  AuthMiddleware.Authenticate(["admin","vendor"]), async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const {id} = req.params
            const product = await service.deleteProduct(id)
            return res.status(200).json(product)
            
        } catch (error) {
            next(error)
            
        }
    })
   
}