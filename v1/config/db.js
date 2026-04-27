import mongoose from "mongoose";


// Función para conectar a la base de datos MongoDB utilizando Mongoose
//puede ser const o default export xq va a ser la unica funcion exportada en este archivo, se exporta para poder usarla en el archivo server.js
export const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI); //se conecta a la base de datos utilizando la URI definida en las variables de entorno{
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};  //funcion q ejecuta lo del try y si hay algun problema no explota la app
    //salta de manera controlada al catch, imprime el error y termina el proceso con un codigo de error 1 (indicando que hubo un error)
    //ademas detiene la ejecucion del servidor para evitar que siga funcionando sin una conexion a la base de datos, lo cual podria causar problemas en las operaciones que dependan de la base de datos.