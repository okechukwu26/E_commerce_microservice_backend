
import { ProductRepository } from "../database/Repository/prodcut-repository";
import { Category, CategoryModel, ModuleModel, Product } from "../database/model";
import { Utils } from "../utils";
import { BadRequestError, ValidationError } from "../utils/ErrorHandler";
import { ProductSchema, option } from "./validation";


export class ProductService {
    private repository :ProductRepository
    constructor(){
        this.repository = new ProductRepository()
    }
    async createProduct(input:Product){
        const {error, value} = ProductSchema.validate(input, option)
        if(error){
            throw new ValidationError(error.details[0].message, "validation error")
        }
        const category = await CategoryModel.findByPk(value.categoryId) as unknown as Category
        if(!category){
            throw new BadRequestError("This category does not exist","bad request")
        }

        value.moduleId = category.moduleId

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
}