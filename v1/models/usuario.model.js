import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "viajero"], required: true },
    plan: { type: String, enum: ["plus", "premium"], default: null },
    itinerarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Itinerario" }],
}, {
    timestamps: true,
});

export default mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);