import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";

interface IUserProps {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

class CreateUserService {
  async execute({ name, email, password, isAdm }: IUserProps) {
    const userRepository = getCustomRepository(UsersRepository);
    const encryptedPass = bcrypt.hashSync(password, 10);

    const verifyEmail = await userRepository.findOne({ email: email });

    if (verifyEmail) {
      throw new Error("E-mail already registered");
    }
    const user = userRepository.create({
      name: name,
      email: email,
      isAdm: isAdm,
      password: encryptedPass,
    });

    await userRepository.save(user);
    const { password: disposable, ...ouputUser } = user;
    return ouputUser;
  }
}

export default CreateUserService;
