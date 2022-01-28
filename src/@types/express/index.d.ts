import { User } from "../../entities";

declare global {
  namespace Express {
    interface Request {
      AuthenticatedUser?: UserModel;
      isAdm: boolean;
    }
  }
}
