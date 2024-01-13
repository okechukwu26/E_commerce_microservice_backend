import { UserRepository } from "../database"
import { User } from "../database/model"
import { FormateData } from "../utils"



export class UserService{
    private userRepository:UserRepository
    constructor(){
        this.userRepository = new UserRepository()
    }
   
    async createVendor(input:User) : Promise<User> {
        const user =   await this.userRepository.createUser(input)
      return FormateData(user)  as unknown as User
     
    }
    async find(input:Record<string, string>) :Promise<User | null> {
        const user = await this.userRepository.Find(input)
        return FormateData(user) as unknown as User
    }


}