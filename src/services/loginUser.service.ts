import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";
import * as bcrypt from "bcryptjs";
import { User } from "../entities";

class LoginUserService {
  async execute(email: string, password: string): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Wrong email/password");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Wrong email/password");
    }
    return user;
  }
}

export default LoginUserService;
