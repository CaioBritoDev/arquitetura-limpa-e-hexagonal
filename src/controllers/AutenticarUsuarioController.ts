import type AutenticarUsuario from "../core/usuario/AutenticarUsuario.js";
import type { Express, Request, Response } from "express";

export default class AutenticarUsuarioController {
  constructor(autenticarUsuario: AutenticarUsuario, app: Express) {
    app.post("/autenticacao", async (req: Request, res: Response) => {
      try {
        const casoDeUso = await autenticarUsuario.executar({
          email: req.body.email,
          senha: req.body.senha,
        });
        res.json({
          accessToken: casoDeUso,
        });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });
  }
}
