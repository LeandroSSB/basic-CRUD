import { getCustomRepository } from "typeorm";
import { User } from "../entities";
import { UsersRepository } from "../repositories/users.repository";

interface UpdateProps {
  uuid: string;
  owner: string;
  isAdm: boolean;
  data: object;
}

class UpdateUserService {
  async execute({ uuid, data, owner, isAdm }: UpdateProps) {
    const userRepository = getCustomRepository(UsersRepository);

    const compare = await userRepository.findOne({
      where: {
        email: owner,
      },
    });

    if (compare?.uuid !== uuid) {
      if (isAdm) {
        await userRepository.update(uuid, {
          updatedOn: new Date().toJSON(),
          ...data,
        });
      } else {
        throw new Error("Missing admin permissions");
      }
    }

    await userRepository.update(uuid, {
      updatedOn: new Date().toJSON(),
      ...data,
    });
    const user = await userRepository.findOne(uuid);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default UpdateUserService;
