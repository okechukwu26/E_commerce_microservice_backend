import { databaseConnection } from "../connection";
import {Model, DataTypes} from "sequelize"
import { CategoryModel } from "./category";
import { UserModel } from "./user";

export interface Product {
    id:string,
    name:string,
    categoryId:string,
    moduleId:string,
    price:number,
    quantity:number,
    images:Array<string>,
    description:string,
    rating:number,
    available:Availabilty,
    ownerId:string
    
}

enum Availabilty {
    IN_STOCK="In Stock",
    OUT_OF_STOCK="Out Of Stock"
}


export class ProductModel extends Model<Product>{}

ProductModel.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    ownerId:{ type:DataTypes.UUID},
    name:{
        type:DataTypes.STRING,
        allowNull:false
        },
 categoryId:{
         type:DataTypes.UUID,
         allowNull:false,
         onDelete: 'CASCADE',
          
         },
     moduleId:{
        type:DataTypes.UUID,
         },
     price:{
         type:DataTypes.DECIMAL(10,2),
         allowNull:false
          },

    quantity:{ type:DataTypes.INTEGER,
         allowNull:false},
     images:{type:DataTypes.ARRAY(DataTypes.STRING)},
     available:{
        type: DataTypes.ENUM('In Stock','Out Of Stock'),
        defaultValue:Availabilty.IN_STOCK
     },
     rating:{
        type : DataTypes.FLOAT,
        defaultValue: 0
     },
     description:{
        type:DataTypes.TEXT,
        allowNull:false
     }

},{sequelize:databaseConnection, tableName:"product"})

//code snippet for relationship between product and category
ProductModel.belongsTo(CategoryModel , { foreignKey:'categoryId'})
    //module relationship
    CategoryModel.hasMany(ProductModel, {foreignKey : "categoryId"})
   UserModel.hasMany(ProductModel, {foreignKey : "ownerId"})
    ProductModel.belongsTo(UserModel, {foreignKey:"ownerId"})
