import { verify } from "jsonwebtoken";
import { authConfigs } from "../configs/auth";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Usuário sem permissão");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfigs.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    return res.json({ message: "Usuário sem permissão" });
  }
}

export { ensureAuth };
