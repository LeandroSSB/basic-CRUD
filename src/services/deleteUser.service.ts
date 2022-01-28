import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";

interface IDeleteProps {
  uuid: string;
  owner: string;
  isAdm: boolean;
}

class DeleteUserService {
  async execute({ uuid, owner, isAdm }: IDeleteProps) {
    const userRepository = getCustomRepository(UsersRepository);
    const compare = await userRepository.findOne({
      where: {
        email: owner,
      },
    });
    const verify = await userRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!verify) {
      throw new Error("User not exists");
    }

    if (compare?.uuid !== uuid) {
      if (isAdm) {
        await userRepository.delete(uuid);
      } else {
        throw new Error("Missing admin permissions");
      }
    }

    await userRepository.delete(uuid);

    return "User deleted with success";
  }
}

export default DeleteUserService;
