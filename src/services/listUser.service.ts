import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";

class ListUserService {
  async execute() {
    const userRepository = getCustomRepository(UsersRepository);

    const users = await userRepository.find();

    return users;
  }
}

export default ListUserService;
