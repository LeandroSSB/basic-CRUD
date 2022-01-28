import { Express, Router } from "express";
import CreateUserController from "../controllers/createUser.controller";
import DeleteUserController from "../controllers/deleteUser.controller";
import FindUserController from "../controllers/findUser.controller";
import ListUserController from "../controllers/listUser.controller";
import LoginUserController from "../controllers/loginUser.controller";
import UpdateUserController from "../controllers/updateUser.controller";
import authenticate from "../middlewares/authenticate.middleware";
import authorizeAdm from "../middlewares/authorizeAdm.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, userSchema } from "../models/userSchema";

const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

export const userRouter = (app: Express) => {
  const router = Router();

  router.get("", authorizeAdm, listUserController.handle);
  router.post("", validate(userSchema), createUserController.handle);
  router.get("/profile", findUserController.handle);
  router.patch("/:uuid", authorizeAdm, updateUserController.handle);
  router.delete("/:uuid", authorizeAdm, deleteUserController.handle);

  app.post(
    "/login",
    validate(loginSchema),
    authenticate,
    loginUserController.handle
  );

  app.use("/users", router);
};
