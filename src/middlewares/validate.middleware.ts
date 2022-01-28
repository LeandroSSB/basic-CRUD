import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";

export const validate =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource, { abortEarly: false });
      next();
    } catch (e: any) {
      console.error(e);
      res.status(400).json({ error: e.errors.join(", ") });
    }
  };
