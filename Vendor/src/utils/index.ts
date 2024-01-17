import Jwt from "jsonwebtoken"
import amqplib, { Channel, ConsumeMessage } from "amqplib"
import { BadRequestError } from "./app-error";



export class Utils {

  static async Encoded (input:{id:string}){
    try {
      return Jwt.sign(input, process.env.JWT_SECRET!)

    } catch (error) {
      throw new BadRequestError("invalid data","bad request")
      
    }
  }
  static async CreateChannel(){
    try {
      const connection = await amqplib.connect(process.env.MSG_QUEUE_URL!);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.EXCHANGE_NAME!, {durable:true});
      return channel;
    } catch (err) {
      throw err;
    }

  }
  static async PublishMessage  (channel:Channel, service:any, msg:any){
    channel.publish(process.env.EXCHANGE_NAME!, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  };
  static async SubscribeMessage (channel:Channel, service:any)  {
    await channel.assertExchange(process.env.EXCHANGE_NAME!, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, process.env.EXCHANGE_NAME!, process.env.VENDOR_SERVICE!);
  
    channel.consume(
      q.queue,
      (msg) => {
        if (  msg?.content) {
          console.log("the message is:", msg.content.toString());
          service.SubscribeEvents(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };
  static async FormatData(data:any){
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }

  }

  static  intertionalizePhoneNumber(telephone:string, code="+234"){
    const arrangenumber = telephone
    .split("")
    .reverse()
    .join("")
    .substring(0, 10)
    .split("")
    .reverse()
    .join("");
  return `${code}${telephone}`
  }
}





