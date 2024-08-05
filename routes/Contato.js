import { Router } from "express";
import { Contato } from "../models/contato.js";
import { contatoValidation } from "../utils/validations.js";

export const contatosRouter = Router();

contatosRouter.get("/contatos", async (req, res) => {
    const lista = await Contato.find();
    res.json(lista);
  });
  contatosRouter.get("/contatos/:id", async (req, res) => {
    const contato = await Contato.findById(req.params.id).select(
      "-__v -favorito"
    ); // select exclui os dados nao requisitados
    if (contato) {
      res.json(contato);
    } else {
      res.status(404).json({ message: "Contato não encontrado!" });
    }
  });
  contatosRouter.put("/contatos/:id", async (req, res) => {
      const { error, value } = contatoValidation.validate(req.body, {abortEarly: false});
      const { nome, sobrenome, email, telefone, observacoes, favorito } = value;
      if(error){
          res.status(400).json({message: "Dados para atualização inválidos, tente novamente.", error: error.details}); //erro 400 bad request
          return;
      }
      try {
      const contato = await Contato.findByIdAndUpdate(req.params.id, {
        nome,
        sobrenome,
        email,
        telefone,
        observacoes,
        favorito,
      });
      if (contato) {
        res.json({ message: "Atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Contato não encontrado :(" });
      }
    } catch (err) {
      res.status(500).json({ message: "Erro ao atualizar contato", error: err });
    }
  });
  contatosRouter.post("/contatos", async (req, res) => {
    const { error, value } = contatoValidation.validate(req.body, {abortEarly: false}); //error > obj com detalhe dos erros de validação | value >dados do req.body
    if(error){
      res.status(400).json({message: "Dados inválidos", error: error.details}); //erro 400 bad request
      return;
      }
    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;
    try {
      const novoContato = new Contato({
        nome,
        sobrenome,
        email,
        telefone,
        observacoes,
        favorito,
      });
  
      await novoContato.save();
      res.json({ message: "Criado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao adicionar contato", error: err });
    }
  });
  contatosRouter.delete("/contatos/:id", async (req, res) => {
    try {
      const contato = await Contato.findByIdAndDelete(req.params.id);
      if (contato) {
        res.json({ message: "Deletado com sucesso!" });
        await contato.deleteOne();
      } else {
        res.status(404).json({ message: "Contato não encontrado!" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Um erro ocorreu ao realizar a ação.", error: err });
    }
  });