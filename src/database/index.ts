import { Connection, ConnectionOptions, createConnection } from "typeorm";

export const connectDatabase = (
  options?: ConnectionOptions
): Promise<Connection> => {
  return createConnection();
};
