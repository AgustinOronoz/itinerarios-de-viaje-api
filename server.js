import app from "./app.js"; //se importa la instancia de express desde el archivo app.js

const PORT = process.env.PORT || 3000; //se define el puerto en el que se va a ejecutar el servidor
//SE INICIALIZA EL SERVIDOR CON METODO LISTEN DE EXPRESS
app.listen(PORT, () => { //se le dice al servidor que escuche en el puerto 3000
    console.log(`http://localhost:${PORT}`); //le paso una funcion callback que se ejecuta cuando el servidor esta listo para recibir peticiones, en este caso imprime un mensaje en la consola
});
 
//EN TERMINAL ESCRIBO COMANDO "node server.js" PARA INICIAR EL SERVIDOR Y
//PODER HACER PETICIONES A LA RUTA "/"
//ME MUESTRA EN LA CONSOLA EL MENSAJE "Servidor escuchando en el puerto 3000" 