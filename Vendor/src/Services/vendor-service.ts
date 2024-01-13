import {VendorRepository} from "../database"
import { Vendor } from "../database/model"
import { FormateData } from "../utils"

export class VendorService{
    private vendorRepository:VendorRepository
    constructor(){
        this.vendorRepository = new VendorRepository()
    }
    async createVendor(input:Vendor) : Promise<Vendor> {
        const user =   await this.vendorRepository.createVendor(input)
      return FormateData(user)  as unknown as Vendor
     
    }
    async find(input:Record<string, string>) :Promise<Vendor | null> {
        const user = await this.vendorRepository.Find(input)
        return FormateData(user) as unknown as Vendor
    }
}