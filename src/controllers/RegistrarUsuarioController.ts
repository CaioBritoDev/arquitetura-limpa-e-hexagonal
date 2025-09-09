import type RegistrarUsuario from "../core/usuario/RegistrarUsuario.js";
import type { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(private registrarUsuarioUseCase: RegistrarUsuario, app: Express) {
    app.post("/usuarios", async (req, res) => {
      const { nome, email, senha } = req.body;
      try {
        const usuario = await this.registrarUsuarioUseCase.executar(
          nome,
          email,
          senha
        );
        res.status(201).json(usuario);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });
  }
}
