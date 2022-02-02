import { createConnection, getConnection } from "typeorm";
import CreateUserService from "../createUser.service";
import DeleteUserService from "../deleteUser.service";
import FindUserService from "../findUser.service";
import ListUserService from "../listUser.service";
import UpdateUserService from "../updateUser.service";

describe("Users Test repo Services", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should return the users list", async () => {
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();
    expect(users).toHaveProperty("map");
  });

  it("Should create new user", async () => {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "123456",
      isAdm: false,
    });

    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).not.toHaveProperty("password");

    expect(user.name).toBe("Test");
    expect(user.email).toBe("test@gmail.com");
  });

  it("Should Find user", async () => {
    const findUserService = new FindUserService();
    const user = await findUserService.execute("test@gmail.com");

    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");

    expect(user).toHaveProperty("password");
    expect(user.password).not.toBe("123456");
  });

  it("Should update user", async () => {
    const user = await new FindUserService().execute("test@gmail.com");
    const newUser = await new UpdateUserService().execute({
      uuid: user.uuid,
      isAdm: user.isAdm,
      owner: user.email,
      data: {
        name: "newTest",
      },
    });

    expect(newUser).toHaveProperty("name");
    expect(newUser.name).toBe("newTest");
  });

  it("Should delete user", async () => {
    const user = await new FindUserService().execute("test@gmail.com");
    const deleteUSer = await new DeleteUserService().execute({
      uuid: user.uuid,
      isAdm: user.isAdm,
      owner: user.email,
    });

    expect(deleteUSer).toBe("User deleted with success");
    expect(() =>
      new FindUserService().execute(user.email)
    ).rejects.toThrowError("User not found");
  });
});
