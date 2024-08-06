import { required } from "joi";
import { model, Schema } from "mongoose";


export const Usuario = model("usuario", new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true
    },
    senha:{
        type: String,
        required: true
    }
}));
