import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { usuarioValidation } from "../utils/validations.js";

export const usuarioRouter = Router();

usuarioRouter.post("/usuarios", async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.details });
    return;
  }
  const { nome, email, senha } = value;
  try {
    const novoUsuario = new Usuario({
      nome,
      email,
      senha,
    });

    await novoUsuario.save();
    res.json({ message: "Criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário.", error: err });
  }
});
usuarioRouter.get("/usuarios", async (req, res) => {
  const lista = await Usuario.find();
  res.json(lista);
});
