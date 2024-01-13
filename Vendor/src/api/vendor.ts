import { Application } from "express";
import { VendorService } from "../Services/vendor-service";
import { Channel } from "amqplib";
import { v4 as uuid } from "uuid";
import { registerVendorSchema, option } from "./validation";
import shortid from "shortid";
import { intertionalizePhoneNumber } from "../utils";

export default (app:Application, channel:Channel) => {
    const service   = new VendorService()
    app.post("/vendor", async (req, res) => {
            const {error} = registerVendorSchema.validate(req.body, option)
            if(error){
                return res.status(400).json({error:error.details[0].message})
            }
        const id = uuid()
            req.body.id = id
            req.body.role="vendor"
            req.body.referralCode=shortid()
            req.body.phone = intertionalizePhoneNumber(req.body.phone)
            const email =  await service.find({email:req.body.email})
            if(email){
                return res.status(400).json({error:"email already in use"})
            }
            const  phone =  await service.find({phone:req.body.phone})
            if(phone){
                return res.status(400).json({error:"phone number already in use"})
            }
        const user = await service.createVendor(req.body)
     
        res.status(201).json(user)
    })

}