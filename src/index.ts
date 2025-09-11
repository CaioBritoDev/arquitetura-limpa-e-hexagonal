import "dotenv/config";
import express from "express";

import CriptografiaBcrypt from "./adapters/auth/CriptografiaBcrypt.js";
import UsuarioEmMemoria from "./adapters/db/UsuarioEmMemoria.js";

import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController.js";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario.js";
import ListarUsuariosController from "./controllers/ListarUsuariosController.js";
import ListarUsuarios from "./core/usuario/ListarUsuarios.js";
import AutenticarUsuario from "./core/usuario/AutenticarUsuario.js";
import AutenticacaoInterna from "./adapters/auth/AutenticacaoInterna.js";
import TokenJwt from "./adapters/auth/TokenJwt.js";
import AutenticarUsuarioController from "./controllers/AutenticarUsuarioController.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Provedores globais
const provedorBancoDeDados = new UsuarioEmMemoria();
const provedorCriptografia = new CriptografiaBcrypt();

// === ROTAS ABERTAS ===

// Registro de usuário
const registrarUsuario = new RegistrarUsuario(
  provedorBancoDeDados,
  provedorCriptografia
);

new RegistrarUsuarioController(registrarUsuario, app);

// Listagem de usuários
const listarUsuarios = new ListarUsuarios(provedorBancoDeDados);
new ListarUsuariosController(listarUsuarios, app);

// Autenticação de usuário
const provedorToken = new TokenJwt(
  process.env.ACCESS_TOKEN_SECRET!,
  process.env.REFRESH_TOKEN_SECRET!
);
const provedorAutenticacao = new AutenticacaoInterna(
  provedorToken,
  provedorBancoDeDados,
  provedorCriptografia
);
const autenticarUsuario = new AutenticarUsuario(provedorAutenticacao);
new AutenticarUsuarioController(autenticarUsuario, app);

// === ROTAS FECHADAS ===
