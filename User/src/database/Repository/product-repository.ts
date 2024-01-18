
import {CategoryModel, ModuleModel, Product, ProductModel, UserModel} from "../model"


export class ProductRepository {
    async create(input:Product){
        const product = await ProductModel.create(input)
        return product
    }

    async getProduct(input:Record<string, string>){
        const product = await ProductModel.findOne({where:input, include: [
            {
              model: CategoryModel,
              include: [ModuleModel], // Include the associated ModuleModel inside CategoryModel
            },
            UserModel
          ],})
        return product

    }
    async getProducts(){
        return ProductModel.findAll({ include: [
            {
              model: CategoryModel,
              include: [ModuleModel],
            
            },
            UserModel
          
          ],})
    }
    async getProductCategory(categoryId:string){
        return ProductModel.findAll({where:{categoryId}, include:[CategoryModel]})
    }
    async getProductModule(moduleId:string) {
            return ProductModel.findAll({where:{moduleId},include:[CategoryModel]})
    }
    async update (id:string, update:any){
        await ProductModel.update(update, {where:{id}})
        return "product updated"
    }
    async delete(id:string){
        await ProductModel.destroy({where:{id}})
        return "product deleted"


    }
    async my (input:{ownerId:string}){
       const product =  await ProductModel.findAll({where:input})
       return product
    }

}