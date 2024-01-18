
import { ProductRepository } from "../database/Repository/product-repository";
import { Category, CategoryModel,  Product } from "../database/model";
import { Utils } from "../utils";
import { BadRequestError, ValidationError } from "../utils/ErrorHandler";
import { ProductSchema, UpdateCategorySchema, option } from "./validation";
import {v4 as uuid} from "uuid"


export class ProductService {
    private repository :ProductRepository
    constructor(){
        this.repository = new ProductRepository()
    }
    async createProduct(input:Product, user:string){
        const {error, value} = ProductSchema.validate(input, option)
        if(error){
            throw new ValidationError(error.details[0].message, "validation error")
        }
        const category = await CategoryModel.findByPk(value.categoryId) as unknown as Category
        if(!category){
            throw new BadRequestError("This category does not exist","bad request")
        }

        value.moduleId = category.moduleId
        value.id = uuid()
        value.name =Utils.Capitalizeword(value.name)
        value.ownerId = user

        const data = await this.repository.create(value)
        return Utils.FormatData(data)
        
    }
    async  getProduct (id:string){
        const product = await this.repository.getProduct({id})
        if(!product){
            throw new BadRequestError("This product does not exist", "Not found")
        }
        return  Utils.FormatData(product)
        
    }
    async getProducts (){
        const product = await this.repository.getProducts()

        return  Utils.FormatData(product)
    }
    async getProductCategory(id:string){
        const product = await this.repository.getProductCategory(id)
        return Utils.FormatData(product)

    }
    async getProductModule(id:string){
        const product = await this.repository.getProductModule(id)
        return Utils.FormatData(product)

    }
    async updateProduct (id:string, update:any){
        const {error, value} = UpdateCategorySchema.validate(update, option)

        if(error){
            throw new ValidationError(error.details[0].message,"validation error")
        }
        if(value.name){
            value.name  =Utils.Capitalizeword(value.name)
        }

        const exist =await this.repository.getProduct({id})
        if(!exist){
            throw new BadRequestError("This product does not exist","Not found")
        }
        const product = await this.repository.update(id, value)
        return Utils.FormatData(product)

    }
    async deleteProduct(id:string){
      const exist =await this.repository.getProduct({id})
        if(!exist){
            throw new BadRequestError("This product does not exist","Not found")
        }
        const product = await this.repository.delete(id)
        return Utils.FormatData(product)
    }
    async MyProduct (user:string){
        console.log(user)
        const product = await this.repository.my({ownerId:user})

        return Utils.FormatData(product)
    }
}