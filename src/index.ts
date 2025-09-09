import express from "express";

import CriptografiaBcrypt from "./adapters/auth/CriptografiaBcrypt.js";
import UsuarioEmMemoria from "./adapters/db/UsuarioEmMemoria.js";

import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController.js";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario.js";
import ListarUsuariosController from "./controllers/ListarUsuariosController.js";
import ListarUsuarios from "./core/usuario/ListarUsuarios.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rotas abertas
const provedorBancoDeDados = new UsuarioEmMemoria();
const provedorCriptografia = new CriptografiaBcrypt();
const registrarUsuario = new RegistrarUsuario(
  provedorBancoDeDados,
  provedorCriptografia
);
new RegistrarUsuarioController(registrarUsuario, app);
const listarUsuarios = new ListarUsuarios(provedorBancoDeDados);
new ListarUsuariosController(listarUsuarios, app);
