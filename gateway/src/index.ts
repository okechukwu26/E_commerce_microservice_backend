import express from "express"
import helmet from "helmet"
import cors from "cors"
import proxy from "express-http-proxy"

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use("/vendor",proxy("http://localhost:8000"))
app.use("/user", proxy("http://localhost:8002"))

app.listen(8001, () => {
    console.log("Gateway is Listening to Port 8001");
  });
