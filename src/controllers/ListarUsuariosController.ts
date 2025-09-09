import ListarUsuarios from "../core/usuario/ListarUsuarios.js";
import type { Express } from "express";

export default class ListarUsuariosController {
  constructor(private listarUsuarios: ListarUsuarios, app: Express) {
    app.get("/usuarios", async (_, res) => {
      try {
        const usuarios = await this.listarUsuarios.executar();
        res.status(200).json(usuarios);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });
  }
}
