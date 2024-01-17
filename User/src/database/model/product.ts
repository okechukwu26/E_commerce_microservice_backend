import { databaseConnection } from "../connection";
import {Model, DataTypes} from "sequelize"

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
    available:Availabilty
    
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
    name:{
        type:DataTypes.STRING,
        allowNull:false
        },
 categoryId:{
         type:DataTypes.UUID,
          
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