
import amqplib from "amqplib"



export const CreateChannel = async () => {
    try {
      const connection = await amqplib.connect(process.env.MSG_QUEUE_URL!);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.EXCHANGE_NAME!, {durable:true});
      return channel;
    } catch (err) {
      throw err;
    }
  };

  export const FormateData = (data:  any) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };

  export const intertionalizePhoneNumber = (telephone:string, code="+234") =>{
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


