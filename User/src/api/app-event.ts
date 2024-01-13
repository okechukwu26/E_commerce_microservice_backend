import { Application, NextFunction, Request, Response } from "express";

export default (app:Application) =>{
    app.use("/app-events", async (req:Request, res:Response, next:NextFunction) =>{
        const { payload } = req.body;

        console.log("============= User ================");
        console.log(payload);

        return res.status(200).json({ message: 'notified!'});
    })
}