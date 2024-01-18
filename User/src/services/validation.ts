import Joi from "joi"
import PasswordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 8,
  max: 30,
  symbol: 1,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 6,
};
const phoneComplexity = {
  min: 11,
  max: 11,
  requirementCount: 2,
};

//Registration validation
export const registerUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: PasswordComplexity(complexityOptions).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  phone: PasswordComplexity(phoneComplexity).required(),

});
export const loginUserSchema = Joi.object().keys({
  phone: PasswordComplexity(phoneComplexity).required(),
})
//module
export const ModuleSchema = Joi.object().keys({
  name:Joi.string().required(),
  image:Joi.string().required()

})
export const UpdateModuleSchema=Joi.object().keys({
  name:Joi.string().optional(),
  image:Joi.string().optional()
})

//category
export const CategorySchema = Joi.object().keys({
  name : Joi.string().required(),
  image : Joi.string().required(),
  moduleId:Joi.string().required() 
})
export const UpdateCategorySchema = Joi.object().keys({
  name : Joi.string().optional(),
  image : Joi.string().optional(),
  moduleId:Joi.string().optional()

})
//   product

 export const ProductSchema = Joi.object().keys({
  name:Joi.string().required(),
  categoryId:Joi.string().required(),
  price:Joi.number().required(),
  quantity:Joi.number().required(),
  images:Joi.array().items(Joi.string()).required(),
  description:Joi.string().required()


})
 export const updateProductSchema = Joi.object().keys({
  name:Joi.string().optional(),
  price:Joi.number().optional(),
  description:Joi.string().optional(),
  images:Joi.array().items(Joi.string()).optional(),
  quantity:Joi.number().optional(),
  available:Joi.string().optional()
})

export const option = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  