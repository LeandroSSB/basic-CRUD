import { getCustomRepository } from "typeorm";
import { User } from "../entities";
import { UsersRepository } from "../repositories/users.repository";

class FindUserService {
  async execute(email: string): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default FindUserService;
