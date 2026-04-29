import mongoose from "mongoose";


const itinerarioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true},
    pais: { type: String, required: true },
     ciudad: { type: String, required: true },
     categoria: {  type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
     duracionDias: { type: Number, required: true, min: 1 },
     presupuesto: { type: Number, required: true },
     imagenUrl: { type: String, default: null },
     usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
     esPublico: { type: Boolean, default: false }
     },
      {
    timestamps: true, //para q mongoose cree automáticamente los campos createdAt y updatedAt para cada documento, lo que facilita el seguimiento de cuándo se creó o actualizó un itinerario.
});

export default mongoose.models.Itinerario || mongoose.model("Itinerario", itinerarioSchema);