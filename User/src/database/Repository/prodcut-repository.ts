import {Product, ProductModel} from "../model"


export class ProductRepository {
    async create(input:Product){
        const product = await ProductModel.create(input)
        return product
    }

    async getProduct(input:Record<string, string>){
        const product = await ProductModel.findOne({where:input, include:["categoryId"]})
        return product

    }
    async getProducts(){
        return ProductModel.findAll({include:["categoryId"]})
    }
    async getProductCategory(categoryId:string){
        return ProductModel.findAll({where:{categoryId}})
    }
    async getProductModule(moduleId:string) {
            return ProductModel.findAll({where:{moduleId}})
    }
    async update (id:string, update:any){
        await ProductModel.update(update, {where:{id}})
        return "product updated"
    }
    async delete(id:string){
        await ProductModel.destroy({where:{id}})
        return "product deleted"


    }

}