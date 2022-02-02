import { createConnection, getConnection } from "typeorm";
import ListUserService from "../listUser.service";

describe("List Users", () => {
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
});
