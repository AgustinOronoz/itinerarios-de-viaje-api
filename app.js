import "dotenv/config";
import express from 'express';
//import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from "./v1/config/db.js";
import v1Router from "./v1/v1.routes.js"; 
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js"; 
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";

//dotenv.config();
connectDB(); //se llama a la función connectDB para establecer la conexión con la base de datos antes de iniciar el servidor
const app = express(); 

app.use(cors());   


app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 


app.get("/", (req, res) => {
    res.json({mensaje: "API funcionando v5"});
});



app.use("/v1", v1Router); 


app.use(notFoundMiddleware);

app.use(errorMiddleware);


export default app; 
