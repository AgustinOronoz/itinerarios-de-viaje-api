import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.model.js";

export const registrarUsuarioService = async (user) => {
    const hashedPassword = bcryptjs.hashSync(user.password,Number(process.env.SALT_ROUNDS)
    );

    //armo un nuevo objeto(mas prolijo que pasa user)
    const nuevoUsuarioData = {
        nombre: user.nombre,
        email: user.email,
        password: hashedPassword,
        rol: user.rol,
        plan: user.rol === "viajero" ? "plus" : null
    };

    const nuevoUsuario = new Usuario(nuevoUsuarioData);
    await nuevoUsuario.save();

    return {
        success: true,
        message: "Usuario registrado exitosamente",
        usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol,
            plan: nuevoUsuario.plan
        }
    };
};

//CAMBIAR LOS ERRORES POR ALGO MAS GENERICO, LUEGO DE HABER HECHO TESTING

export const loginUsuarioService = async (user) => {
    const usuarioEncontrado = await Usuario.findOne({ email: user.email });
    if (!usuarioEncontrado) {
        return { success: false, message: "Usuario no encontrado" };
    }
    const valid = bcryptjs.compareSync(user.password, usuarioEncontrado.password);
    if (!valid) {
        return { success: false, message: "Contraseña incorrecta" };
    }
    //ideal no paso usuario pero opción
   
    return { success: true, message: "Login exitoso",   usuario: {
            nombre: usuarioEncontrado.nombre,
            plan: usuarioEncontrado.plan
        }};
};