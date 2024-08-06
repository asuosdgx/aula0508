import Joi from "joi"; //Biblioteca que facilita 

//Validar a inserção na atualização do contato: 

export const contatoValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    sobrenome: Joi.string().max(150),
    email: Joi.string().email(),
    telefone: Joi.string().required(),
    observacoes: Joi.string().max(140),
    favorito: Joi.boolean()
    
});

export const usuarioValidation = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required,
    senha: Joi.string().min(8).max(20).required()
})

